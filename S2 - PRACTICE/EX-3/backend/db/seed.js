const { sequelize, Student, Class, AttendanceRecord } = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const alice = await Student.create({ name: 'Alice', email: 'alice@example.com' });
    const bob = await Student.create({ name: 'Bob', email: 'bob@example.com' });
    const charlie = await Student.create({ name: 'Charlie', email: 'charlie@example.com' });

    const math = await Class.create({ name: 'Mathematics' });
    const science = await Class.create({ name: 'Science' });
    const history = await Class.create({ name: 'History' });

    await AttendanceRecord.create({ studentId: alice.id, classId: math.id, date: '2025-06-17', status: 'present' });
    await AttendanceRecord.create({ studentId: bob.id, classId: math.id, date: '2025-06-17', status: 'absent' });
    await AttendanceRecord.create({ studentId: charlie.id, classId: math.id, date: '2025-06-17', status: 'late' });
    await AttendanceRecord.create({ studentId: alice.id, classId: science.id, date: '2025-06-18', status: 'present' });
    await AttendanceRecord.create({ studentId: bob.id, classId: science.id, date: '2025-06-18', status: 'present' });
    await AttendanceRecord.create({ studentId: alice.id, classId: history.id, date: '2025-06-19', status: 'absent' });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seed();

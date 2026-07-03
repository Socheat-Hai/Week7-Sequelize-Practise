const { Student, Class, AttendanceRecord } = require('../models');

const markAttendance = async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const { classId, status } = req.body;

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const classObj = await Class.findByPk(classId);
    if (!classObj) return res.status(404).json({ error: 'Class not found' });

    const [record, created] = await AttendanceRecord.findOrCreate({
      where: { studentId, classId, date },
      defaults: { status }
    });

    if (!created) {
      record.status = status;
      await record.save();
    }

    res.status(created ? 201 : 200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceForStudentOnDate = async (req, res) => {
  try {
    const { studentId, date } = req.query;

    const records = await AttendanceRecord.findAll({
      where: { studentId, date },
      include: [{ model: Class, attributes: ['name'] }]
    });

    if (!records.length) return res.status(404).json({ error: 'No attendance record found' });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAttendanceForClass = async (req, res) => {
  try {
    const { id } = req.params;

    const classObj = await Class.findByPk(id);
    if (!classObj) return res.status(404).json({ error: 'Class not found' });

    const records = await AttendanceRecord.findAll({
      where: { classId: id },
      include: [{ model: Student, attributes: ['name', 'email'] }]
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAttendanceSummaryForStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const records = await AttendanceRecord.findAll({
      where: { studentId: id },
      include: [{ model: Class, attributes: ['name'] }]
    });

    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;

    res.json({
      student: student.name,
      summary: { total, present, absent, late },
      records
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { markAttendance, getAttendanceForStudentOnDate, listAttendanceForClass, getAttendanceSummaryForStudent };

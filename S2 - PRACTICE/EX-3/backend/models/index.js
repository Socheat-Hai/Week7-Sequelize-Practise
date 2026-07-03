const sequelize = require('../db/database.js');
const Student = require('./Student.js');
const Class = require('./Class.js');
const AttendanceRecord = require('./AttendanceRecord');

Student.hasMany(AttendanceRecord, { foreignKey: 'studentId' });
AttendanceRecord.belongsTo(Student, { foreignKey: 'studentId' });

Class.hasMany(AttendanceRecord, { foreignKey: 'classId' });
AttendanceRecord.belongsTo(Class, { foreignKey: 'classId' });

module.exports = { sequelize, Student, Class, AttendanceRecord };

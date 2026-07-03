const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const AttendanceRecord = sequelize.define('AttendanceRecord', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late'),
    allowNull: false
  }
});

module.exports = AttendanceRecord;

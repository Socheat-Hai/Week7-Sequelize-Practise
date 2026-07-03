const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendanceController');

router.post('/attendance', controller.markAttendance);
router.get('/attendance', controller.getAttendanceForStudentOnDate);
router.get('/classes/:id/attendance', controller.listAttendanceForClass);
router.get('/students/:id/attendance', controller.getAttendanceSummaryForStudent);

module.exports = router;

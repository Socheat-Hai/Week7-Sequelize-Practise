const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/', attendanceRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;

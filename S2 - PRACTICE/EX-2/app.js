const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authorRoutes = require('./routes/authorRoutes');
app.use('/api/authors', authorRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
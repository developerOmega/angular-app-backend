const express = require('express');
const app = express();

app.use(require('../routes/initRoutes'));
app.use(require('./userRoutes'));
app.use(require('./articleRoutes'));

module.exports = app;
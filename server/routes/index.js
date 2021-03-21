const express = require('express');
const app = express();

// Agregar archivos de rutas en aplicación de express
app.use(require('../routes/initRoutes'));
app.use(require('./userRoutes'));
app.use(require('./articleRoutes'));

module.exports = app;
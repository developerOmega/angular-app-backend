const Init = require('../controllers/init');
const express = require('express');
const app = express();

const INIT = new Init;

app.get('/init', INIT.index);
app.get('/init/:id', INIT.show);

module.exports = app;
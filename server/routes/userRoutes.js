const UserController = require('../controllers/userController');
const { authUser, authjwt } = require('../middlewares/auth');
const express = require('express');
const app = express();

// Crear nueva instancia de rutas de Usuarios
const USER = new UserController;

// Definir rutas de usuarios (INDEX, SHOW, CREATE, UPDATE, DELETE)
app.get('/v1/users', USER.index);
app.get('/v1/users/:id', USER.show);
app.post('/v1/users', USER.post);
app.put('/v1/users/:id', [authjwt, authUser], USER.update);
app.delete('/v1/users/:id',[authjwt, authUser], USER.delete);

// Definir ruta de login de usuario
app.post('/v1/login', USER.login);

module.exports = app;
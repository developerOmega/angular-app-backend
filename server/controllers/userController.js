const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { jwtEnv } = require('../config/config');

class UserController {

  // Método de ruta para visualizar todos los usuarios
  // Recibe parámetros -> req:Request, res:Response
  index(req, res) {
    const init = Number(req.query.init) || 0;
    const end = Number(req.query.end) || 0;

    // Buscar todos los usuarios
    User.find({})
      .sort('created_at')
      .skip(init)
      .limit(end)
      .exec((err, users) => {

        // Si hay error, retornar json de status 400
        if(err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        // Retornar json con todos los artículos
        return res.status(200).json({
          ok: true,
          users
        });
      });
  }

  // Método de ruta para visualizar usuario buscado por el parámetro id
  // Recibe parámetros -> req:Request, res:Response
  show(req, res) {
    let id = req.params.id;

    // Buscar usuario por id
    User.findById(id)
      .exec((err, user) => {

        // Si hay error, retornar json de status 404
        if(err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        // Retornar json con el usuario
        return res.status(200).json({
          ok: true,
          user
        });
      });
  }

  // Método de ruta para crear nuevo usuario
  // Recibe parámetros -> req:Request, res:Response
  post(req, res) {
    let body = req.body;

    // Crear instancia para nuevo usuario
    let user = new User({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    });

    // Crear nuevo usuario
    user.save((err, userDB) => {

      // Si hay error, retornar json de status 400
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información del nuevo usuario
      return res.status(200).json({
        ok: true,
        user: userDB
      });
    })
  }

  // Método para actualizar información de usuario
  // Recibe parámetros -> req:Request, res:Response
  update(req, res) {
    let id = req.params.id;
    let body = req.body;

    // Buscar usuario por id y actualizarlo con los datos de la constante body
    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, user) => {

      // Si hay error, retornar json de status 400
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información actualizada del usuario
      return res.status(200).json({
        ok: true,
        user
      });
    });
  }

  // Método para eliminar usuario
  // Recibe parámetros -> req:Request, res:Response
  delete(req, res) {
    let id = req.params.id;

    // Buscar usuario por id y eliminarlo
    User.findByIdAndRemove(id, (err, user) => {

      // Si hay error, retornar json de status 400
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información eliminación del usuario
      return res.status(200).json({
        ok: true,
        user
      });
    });
  }

  // Método para autenticar sesión de usuario
  // Recibe parámetros -> req:Request, res:Response
  login(req, res) {
    let body = req.body;

    // Buscar usuario por id
    User.findOne({email: body.email}, (err, user) => {  
      
      // Si hay error, retornar json de status 500
      if(err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      // Si no hay existe el usuario, retornar json con respuesta 400 
      if(!user) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El mail y la contraseña son incorrectos"
          }
        });
      }

      // Si la contraseña del usuario no coincide con la contraseña de la petición, retornar json con respuesta 400 
      if( !bcrypt.compareSync(body.password, user.password)){
        return res.status(400).json({
          ok: false,
          err: {
            message: "El mail y la contraseña son incorrectos"
          }
        });
      }

      // Crear token
      const token = jwt.sign({user}, jwtEnv.privateKey, jwtEnv.signOptions);

      // Retornar json con token de autenticación
      return res.status(200).json({
        ok: true,
        user: user,
        token
      })
    });
  }
}

module.exports = UserController;
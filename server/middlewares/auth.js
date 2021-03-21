const jwt = require('jsonwebtoken');
const { jwtEnv } = require('../config/config');
const User = require('../models/user');
const Article = require('../models/article');

// Middleware para autenticar sesión de usuarios con jwt
// Recibe parámetros -> req:Request, res:Response, next:Next
const authjwt = (req, res, next) => {

  // Buscar token de usuario por el header Authorization
  let token = req.get('Authorization');
  jwt.verify(token, jwtEnv.publicKey, jwtEnv.verifyOptions, (err, decode) => {

    // Si hay error, retornar json de status 403
    if(err) {
      return res.status(403).json({
        ok: false,
        err
      });
    }

    // Agregar información de usuario a req
    req.user = decode.user;
    next();
  });
}

// Middleware para autenticar peticiones de usuario
// Recibe parámetros -> req:Request, res:Response, next:Next
const authUser = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  // Buscar usuario por id (id obtenido de ruta)
  User.findById(id, (err, userDB) => {

    // Si hay error, retornar json de status 400
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    // Si el usuario de la base de datos es diferente del usuario obtenido del token jwt, retornar json de status 403
    if(userDB._id != user._id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion"
        }
      });
    }
    next();
  })
}

// Middleware para autenticar peticiones de artículos
// Recibe parámetros -> req:Request, res:Response, next:Next
const authArticle = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  // Buscar artículo por id (id obtenido de ruta)
  Article.findById(id, (err, article) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    // Si el usuario del artículo de la base de datos es diferente del usuario obtenido por el token jwt, retornar json de status 403
    if(article.user != user._id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion"
        }
      });
    }
    next();
  })

}

module.exports = {
  authjwt, authArticle, authUser
}
const jwt = require('jsonwebtoken');
const { jwtEnv } = require('../config/config');
const User = require('../models/user');
const Article = require('../models/article');

const authjwt = (req, res, next) => {
  let token = req.get('Authorization');
  jwt.verify(token, jwtEnv.publicKey, jwtEnv.verifyOptions, (err, decode) => {
    if(err) {
      return res.status(403).json({
        ok: false,
        err
      });
    }
    req.user = decode.user;
    next();
  });
}

const authUser = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  User.findById(id, (err, userDB) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
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

const authArticle = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  Article.findById(id, (err, article) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

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
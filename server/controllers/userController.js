const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { jwtEnv } = require('../config/config');

class UserController {
  index(req, res) {
    const init = Number(req.query.init) || 0;
    const end = Number(req.query.end) || 0;

    User.find({})
      .sort('created_at')
      .skip(init)
      .limit(end)
      .exec((err, users) => {
        if(err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        return res.status(200).json({
          ok: true,
          users
        });
      });
  }

  show(req, res) {
    let id = req.params.id;
    User.findById(id)
      .exec((err, user) => {
        if(err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        return res.status(200).json({
          ok: true,
          user
        });
      });
  }

  post(req, res) {
    let body = req.body;
    let user = new User({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err, userDB) => {
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        user: userDB
      });
    })
  }

  update(req, res) {
    let id = req.params.id;
    let body = req.body;
    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, user) => {
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        user
      });
    });
  }

  delete(req, res) {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        user
      });
    });
  }

  login(req, res) {
    let body = req.body;
    User.findOne({email: body.email}, (err, user) => {  
      if(err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if(!user) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El mail y la contraseña son incorrectos"
          }
        });
      }

      if( !bcrypt.compareSync(body.password, user.password)){
        return res.status(400).json({
          ok: false,
          err: {
            message: "El mail y la contraseña son incorrectos"
          }
        });
      }

      const token = jwt.sign({user}, jwtEnv.privateKey, jwtEnv.signOptions);

      return res.status(200).json({
        ok: true,
        user: user,
        token
      })
    });
  }
}

module.exports = UserController;
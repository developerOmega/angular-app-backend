const fs = require('fs');

// ===========================================
// Puerto
// ===========================================

const port = process.env.PORT || 3000;

// ===========================================
// Entorno
// ===========================================
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===========================================
// Base de datos
// ===========================================
const uriDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/111btec' : process.env.MONGO_URI; 


// ===========================================
// Configuracion de jsonwebtoken
// ===========================================
const jwtEnv = {
  signOptions: {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  "RS256"
  },
  
  verifyOptions: {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  ["RS256"]
  },

  publicKey: env === 'dev' ? fs.readFileSync('server/keys/public.key', 'utf8') : process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
  privateKey: env === 'dev' ? fs.readFileSync('server/keys/private.key', 'utf8') : process.env.PRIVATE_KEY.replace(/\\n/gm, '\n')  
}

module.exports = {
  port, env, uriDB, jwtEnv
}



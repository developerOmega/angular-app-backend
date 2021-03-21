const express = require('express');
const mongoose = require('mongoose');
const { port, uriDB } = require('./config/config');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Carpeta publica
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Configuración de CORS, solo hay acceso al localhost:4200
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse aplication json
app.use(bodyParser.json());

// Ejecutar rutas
app.use(require('./routes/index'));

// Coneccion a mongo db
mongoose.connect(uriDB,
  {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, 
  (err, res) => {
  if(err){
    throw new Error(err);
  }
  else {
    console.log("Base de datos ONLINE");
  }
})

// Accediendo al puerto 3000
app.listen(port, () => {
  console.log(`Escuachando en el puerto ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const { port, uriDB } = require('./config/config');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Carpeta publica
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Configuracion de CORS
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

// Rutas
app.use(require('./routes/index'));

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

app.listen(port, () => {
  console.log(`Escuachando en el puerto ${port}`);
});

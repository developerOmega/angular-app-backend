const ArticleController = require('../controllers/articleController');
const { authjwt, authArticle } = require('../middlewares/auth');
const express = require('express');
const app = express();

// Crear nueva instancia de rutas de Artículos
const ARTICLE = new ArticleController;

// Definir rutas de artículos (INDEX, SHOW, CREATE, UPDATE, DELETE)
app.get('/v1/articles', ARTICLE.index);
app.get('/v1/articles/:id', ARTICLE.show);
app.post('/v1/articles', authjwt, ARTICLE.post);
app.put('/v1/articles/:id', [authjwt, authArticle], ARTICLE.update);
app.delete('/v1/articles/:id', [authjwt, authArticle], ARTICLE.delete);

module.exports = app;

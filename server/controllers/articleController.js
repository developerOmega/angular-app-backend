const Article = require('../models/article');

class ArticleController {

  // Método de ruta para visualizar todos los artículos
  // Recibe parámetros -> req:Request, res:Response
  index(req, res) {
    const init = Number(req.query.init) || 0;
    const end = Number(req.query.finish) || 0;
    
    // Buscar todos los artículos
    Article.find({})
      // Ordenar por columna de created_at
      .sort('created_at')
      // Evitar registros
      .skip(init)
      // Límite de registros
      .limit(end)
      // Agregar datos de registros de usuarios (name y email)
      .populate('user', 'name email')
      .exec((err, articles) => {
        
        // Si hay error, retornar json de status 400
        if(err){
          return res.status(400).json({
            ok: false,
            err
          });
        }

        // Retornar json con todos los artículos
        return res.status(200).json({
          ok: true,
          articles
        });
      });
  }

  // Método de ruta para visualizar articulo buscado por el parámetro id
  // Recibe parámetros -> req:Request, res:Response
  show(req, res){
    let id = req.params.id;

    // Buscar artículo por id
    Article.findById(id)
      .populate('user', 'name email')
      .exec((err, article) => {

        // Si hay error, retornar json de status 404
        if(err) {
          return res.status(404).json({
            ok: false,
            err
          });
        }

        // Retornar json con el artículo
        return res.status(200).json({
          ok: true,
          article
        });
      })
  }

  // Método de ruta para crear nuevo artículo
  // Recibe parámetros -> req:Request, res:Response
  post(req, res) {
    let body = req.body;

    // Crear instancia para nuevo artículo
    let article = new Article({
      title: body.title,
      description: body.description,
      content: body.content,
      user: req.user
    });

    // Crear nuevo artículo
    article.save((err, articleDB) => {

      // Si hay error, retornar json de status 400
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información del nuevo artículo
      return res.status(200).json({
        ok: true,
        article: articleDB
      });
    });
  }

  // Método para actualizar información de artículo
  // Recibe parámetros -> req:Request, res:Response
  update(req, res) {
    let id = req.params.id;
    let body = req.body;

    // Buscar articulo por id y actualizarlo con los datos de la constante body
    // Parametro “new” para retornar nuevo información de artículos, “runValidators” para activar validaciones
    Article.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, article) => {
      
      // Si hay error, retornar json de status 400
      if(err) {
        return res,status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información actualizada del artículo
      return res.status(200).json({
        ok: true,
        article
      });
    })
  }

  // Método para eliminar artículo
  // Recibe parámetros -> req:Request, res:Response
  delete(req, res) {
    let id = req.params.id;
    
    // Buscar artículo por id y eliminarlo 
    Article.findByIdAndRemove(id, (err, article) => {

      // Si hay error, retornar json de status 400
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Retornar json con información eliminación del artículo
      return res.status(200).json({
        ok: true,
        article
      });
    });
  }
}

module.exports = ArticleController;
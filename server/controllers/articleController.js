const Article = require('../models/article');

class ArticleController {
  index(req, res) {
    const init = Number(req.query.init) || 0;
    const end = Number(req.query.finish) || 0;
    
    Article.find({})
      .sort('created_at')
      .skip(init)
      .limit(end)
      .populate('user', 'name email')
      .exec((err, articles) => {
        if(err){
          return res.status(400).json({
            ok: false,
            err
          });
        }

        return res.status(200).json({
          ok: true,
          articles
        });
      });
  }

  show(req, res){
    let id = req.params.id;
    Article.findById(id)
      .populate('user', 'name email')
      .exec((err, article) => {
        if(err) {
          return res.status(404).json({
            ok: false,
            err
          });
        }

        return res.status(200).json({
          ok: true,
          article
        });
      })
  }

  post(req, res) {
    let body = req.body;
    let article = new Article({
      title: body.title,
      content: body.content,
      description: body.description,
      user: req.user
    });

    article.save((err, articleDB) => {
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        article: articleDB
      });
    });
  }

  update(req, res) {
    let id = req.params.id;
    let body = req.body;

    Article.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, article) => {
      if(err) {
        return res,status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        article
      });
    })
  }

  delete(req, res) {
    let id = req.params.id;
    
    Article.findByIdAndRemove(id, (err, article) => {
      if(err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      return res.status(200).json({
        ok: true,
        article
      });
    });
  }
}

module.exports = ArticleController;
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Definir colección de artículos
let articleSchema = new Schema({
  title: {type: String, required: [true, "title is reuqired"]},
  content: {type: String, required: [true, "content is required"]},
  description: {type: String, required: [true, "header is required"]},
  img: {type: String, required: true, default: 'assets/img/article_default.png'},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Article', articleSchema);

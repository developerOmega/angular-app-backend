const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Definir colección de usuarios
let userSchema = new Schema({
  name: {type: String, required: [true, "name is required"]},
  email: {type: String, unique: true, required: [true, "email is required"]},
  password: {type: String, required: [true, "passowrd is required"]},
  img: {type: String, required: true, default: "assets/img/user_default.png"}
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: String,
  author: String,
  content: String,
  userId: String
})

module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: String,
  author: String,
  content: String,
})

module.exports = mongoose.model('Post', postSchema);
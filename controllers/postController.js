const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

router.post('/post/new', (req, res) => {
  const { title, author, content, userId } = req.body
  Post.create({ title, author, content, userId })
    .then(post => {
      User.findById(userId)
        .then(user => {
          user.posts.push(post._id)
          user.markModified('posts')
          user.save()
        })
      res.send('success').status(200)
    })
})

router.get('/allposts', (req, res) => {
  Post.find()
    .then(posts => {
      res.send(posts)
    })
})

module.exports = router
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password
  // Find this user name
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // User not found
        res.send({
          result: 'Unsuccessful',
          message: 'Wrong Email or Password',
        })
      }
      // Check the password
      // not working for some reason
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          res.send({
            result: 'Unsuccessful',
            message: 'Wrong Email or Password',
          })
        }
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET, { expiresIn: '60 days' })
        res.send({
          result: 'Success',
          userId: user._id,
          token,
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/register', (req, res) => {
  const body = req.body
  const { email, password, passwordConf } = body
  let user = {}
  if (password === passwordConf) {
    user = new User(body)
  } else {
    return res.send({ message: 'Passwords do not match' })
  }
  user.email = user.email.toLowerCase()
  User.findOne({ email }).then((check) => {
    if (!check) {
      user.save().then((u) => {
        const token = jwt.sign({ id: u._id, name: u.name }, process.env.SECRET, { expiresIn: '60 days' })
        res.send({
          result: 'Success',
          userId: u._id,
          token,
        })
      })
    } else {
      res.send({
        result: 'Unsuccessful',
        message: 'This Email is already in use',
      })
    }
  })
})

module.exports = router
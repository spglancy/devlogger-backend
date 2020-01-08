const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')

router.get('/company/:id', (req, res) => {
  User.findById(req.params.id)
    .populate('posts')
    .then(company => {
      res.send(company)
    })
})

router.get('/company/search/:name', (req, res) => {
  User.findOne({ companyName: req.params.name })
    .then(company => {
      res.send({ name: company.companyName, content: company.companyInfo })
    }).catch(err => {
      console.log(err)
    })
})

module.exports = router
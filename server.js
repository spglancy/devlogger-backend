const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authController = require('./controllers/authController')
const companyController = require('./controllers/companyController')
const postController = require('./controllers/postController')
const mongoose = require('mongoose')

// Connecting to the mongoDB
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    throw err;
  })

// Importing static files.
app.use(express.static(__dirname + '/public'))

// Configuring bodyparser.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Setting application routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', authController)
app.use('/', companyController)
app.use('/', postController)

// 404 redirect
app.get('*', function (req, res) {
  res.send({
    message: 'This endpoint does not exist',
    error: 404,
  }, 404);
});

// Starting application on configured port.
app.listen(process.env.PORT, () => {
  console.log(`Application is running on port: ${process.env.PORT}`);
});

module.exports = app;
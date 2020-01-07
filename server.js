const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const mongoose = require('mongoose');

/**
 * Connecting to the mongoDB
 */
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    throw err;
  })

/**
 * Importing static files.
 */
app.use(express.static(__dirname + '/public'));

/**
 * Configuring bodyparser.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * Setting application routes
 */

app.use('/', authController);

/**
 * 404 redirect
 */
app.get('*', function (req, res) {
  res.send({
    message: 'This endpoint does not exist',
    error: 404,
  }, 404);
});

/**
 * Starting application on configured port.
 */
app.listen(process.env.PORT, () => {
  console.log(`Application is running on port: ${process.env.PORT}`);
});

module.exports = app;
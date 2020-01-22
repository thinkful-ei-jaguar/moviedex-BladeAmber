require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const movies = require('./movies');

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
  console.log('validate bearer token middleware');
  debugger
  next();
});

const getMovies = (req, res) => {
  res.json(movies);
};



app.get('/movie', getMovies);

const PORT = 8000;

app.listen(8001, () => {
  console.log('Server listening at http://localhost: 8001');
});


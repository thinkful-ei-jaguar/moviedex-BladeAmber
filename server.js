require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const movies = require('./movies');

app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
  
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  console.log('validate bearer token middleware');
  
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request'});
  }
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


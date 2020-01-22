require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
let movies = require('./movies.json');

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
  const { genre, country, avg_vote } = req.query;
  console.log(genre, country, avg_vote);

  if (genre) {
    movies = movies.filter(movie => {
      return movie.genre.toLowerCase().includes(genre.toLowerCase());
    });
  }

  if (country) {
    movies = movies.filter(movie => {
      return movie.country.toLowerCase().includes(country.toLowerCase());
    });
  }

  if (avg_vote) {

  }

  res.json(movies);
};



app.get('/movie', getMovies);



app.listen(8001, () => {
  console.log('Server listening at http://localhost: 8001');
});


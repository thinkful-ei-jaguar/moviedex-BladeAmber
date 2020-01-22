require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const movies = require('./movies.json');
const cors = require('cors');
const helmet = require('helmet');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(helmet())

app.use(function validateBearerToken(req, res, next) {
  
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  console.log('validate bearer token middleware');
  
  if(!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request'});
  }
  next();
});

function getMovies (req, res) {
  let { genre, country, avg_vote } = req.query;

  let response = movies;

  if (genre) {
    response = response.filter(movie => {
      return movie.genre.toLowerCase().includes(genre.toLowerCase());
    });
  }

  if (country) {
    response = response.filter(movie => {
      return movie.country.toLowerCase().includes(country.toLowerCase());
    });
  }

  if (avg_vote) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }

  res.json(response);
}



app.get('/movie', getMovies);



app.listen(8001, () => {
  console.log('Server listening at http://localhost: 8001');
});


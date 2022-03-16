// import joi
const Joi = require('joi');
// import express
const express = require('express');
// define app with express
const app = express();
// use json
app.use(express.json());
// define constant genres
const genres = [
  {id: 1, name: 'action'},
  {id: 2, name: 'comedy'},
  {id: 3, name: 'drama'},
  {id: 4, name: 'horror'},
  {id: 5, name: 'romance'},
  {id: 6, name: 'thriller'},
];

// GET all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// GET specific genre
app.get('/api/genres/:id', (req, res) => {
  // check if we have a valid id
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  // send genre
  res.send(genre);
});

// PORT START
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// POST request for new genre
app.post('/api/genres', (req, res) => {
  // validate genre
  const {error} = validateGenre(req.body);
  // if invalid, return 400 - Bad request
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // create genre
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  // push genre to genres
  genres.push(genre);
  // send genre
  res.send(genre);
});
/**
 *
 * @param {genre} genre
 * @return {object} result
 */
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

// PUT request for specific genre
app.put('/api/genres/:id', (req, res) => {
  // look up genre
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  // if genre not found, return 404
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  // validate genre
  const {error} = validateGenre(req.body);
  // if invalid, return 400 - Bad request
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // update genre
  genre.name = req.body.name;
  // send genre
  res.send(genre);
});

// DELETE request for specific genre
app.delete('/api/genres/:id', (req, res) => {
  // look up genre
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  // if genre not found, return 404
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  // remove genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // send status
  res.send(genre);
});

const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'},
];


// GET method for empty endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET method for courses from api
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// GET method for specific course from api
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with the given ID was not found.');
  }
  res.send(course);
});

// POST method for specific course
app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = schema.validate(req.body, schema);
  console.log(result);
  if (result.error) {
    res.status(400)
        .send(result.error.details[0].message);
    return;
  };
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


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
    return res.status(404).send('The course with the given ID was not found.');
  }
  res.send(course);
});

// POST method for specific course
app.post('/api/courses', (req, res) => {
  // Validate course
  const {error} = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
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

// PUT request
app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // If course not found, return 404
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }
  // Validate course
  const {error} = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Update course
  course.name = req.body.name;
  res.send(course);
});
/**
 *
 * @param {course} course
 * @return {object} result
 */
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

// DELETE request
app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // If course not found, return 404
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

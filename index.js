const path = require('path'); // import path module from node
const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser

const app = express(); // create express app

app.use(bodyParser.json()); // use body-parser
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/add', (req, res) => {
  const {a, b} = req.body;
  res.send(result = parseInt(a) + parseInt(b));
});
// create a route on listening port 5050
app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});

const express = require('express');
const bodyParser = require('body-parser');
const wordController = require('./Controllers/wordController.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.listen(port);

app.route('/word')
  .get(wordController.wordStatistics)
  .post(wordController.wordCounter);

app.route('/urlTest')
  .get(wordController.test)
console.log('API server started on: ' + port);

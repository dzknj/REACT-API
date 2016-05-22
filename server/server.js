const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const citiesRouter = require(__dirname + '/routes/citiesRouter');
var port = 5678;

mongoose.connect('mongodb://localhost/city_slums');

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req,res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});
app.use('/api', citiesRouter);
app.listen(port, () => console.log('server up on port:' + port));

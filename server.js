require('babel-register');

var _ = require('underscore');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var City = require('./models/city');
var bodyParser = require('body-parser');
var logger = require('morgan');

var config = require('./config');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Are you running mongod??');
});


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/cities', bodyParser.json(), function(req, res, next) {
  var newCity = new City(req.body);
  newCity.save((err, data) => {
    if(err) return console.log('error adding city');
    res.status(200).json(data);
  })
});

// app.get('/api/cities', (req, res) => {
//   City.find(null, (err, data) => {
//     if(err) return console.log('error GET-ing cities');
//     res.status(200).json(data);
//   });
// });

app.get('/api/cities/list', function(req, res, next) {
  var params = req.query;
  var conditions = {};

  _.each(params, function(value, key) {
    conditions[key] = new RegExp('^' + value + '$', 'i');
  });

  City
    .find(conditions)
    .exec(function(err, cities) {
      if (err) return next(err);

      console.log(cities);
      res.send(cities);
    });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server running on port: ' + app.get('port'));
});

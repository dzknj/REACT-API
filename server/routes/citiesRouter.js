
const Router = require('express').Router;
const City = require('../models/city');
const bodyParser = require('body-parser').json();
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');

var citiesRouter = module.exports = Router();

citiesRouter.get('/cities', (req, res) => {
  console.log('/cities GET routes work!');
  City.find(null, (err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

citiesRouter.post('/cities', bodyParser, (req, res) => {
  console.log('/cities POST route works!');
  var newCity = new City(req.body);
  newCity.save((err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

citiesRouter.put('/cities/:id', bodyParser, (req, res) => {
  var cityData = req.body;
  delete cityData._id;
  City.update({ _id: req.params.id }, cityData, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'city form complete!' });
  });
});

citiesRouter.delete('/cities/:id', (req, res) => {
  City.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'deleted city' });
  });
});

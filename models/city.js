var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  name: {type: String, unique: true},
  usState: String,
  population: String,
  crimeLevel: String
});

module.exports = mongoose.model('City', citySchema);

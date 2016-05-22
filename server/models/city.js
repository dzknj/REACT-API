const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  crimeLevel: {
    type: String
  }
});

module.exports = exports = mongoose.model('City', citySchema);

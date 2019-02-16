const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
  name: String,
  type: {type: String, enun: ['coffee shop', 'bookstore']},
  location: {type: {type: String}, coordinates:[Number]}
}, {
  timestsmps: true
});

module.exports = mongoose.model('Place', placesSchema);
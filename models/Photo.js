var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

console.log('calling the Photo model module');

var schema = mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);

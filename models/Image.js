var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  categories: Array,
  uploaded_on: Date,
  image: Schema.Types.Mixed
});

module.exports = mongoose.model('Image', ImageSchema);

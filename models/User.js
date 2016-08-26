var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  admin: Boolean
});

UserSchema.pre('save', function(next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
  
  next();
});

module.exports = mongoose.model('User', UserSchema);

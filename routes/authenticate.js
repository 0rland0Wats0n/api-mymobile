var app = require('express')();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var User = require('../models/User');

module.exports = {
  authenticate: function(req, res) {
    User.findOne()
      .where('username', req.body.username)
      .exec(function(err, user) {
        if(err) {
          res.json({
            error: true,
            stack: err
          });
          return;
        }

        if(!user) {
          res.json({
            error: true,
            message: 'Authentication failed. User not found.'
          });
          return;
        }

        if(!bcrypt.compareSync(req.body.password, user.password)) {
          res.json({
            error: true,
            message: 'Authentication falied. Wrong password.'
          });
          return;
        }

        var token = jwt.sign(user, require('../middleware/secret').secret, {
          expiresIn: 86400 //24hrs
        });

        res.json({
          error: false,
          message: 'Authentication successful.',
          token: token
        });
      });
  }
}

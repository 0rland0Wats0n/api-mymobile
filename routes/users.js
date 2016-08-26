var mongoose = require('mongoose');
var User = require('../models/User');

module.exports = {

  getAll: function(req, res) {
    User.find()
      .exec(function(err, users) {
        if(err) {
          res.json({
            error: true,
            stack: err
          });
          return;
        }

        if(!users.length) {
          res.json({
            error: true,
            message: 'No users yet.'
          });
          return;
        }

        res.json({
          error: false,
          users: users
        });
      });
  },

  createUser: function(req, res) {
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

        if(user) {
          res.json({
            error: true,
            message: 'User already exists.'
          });
          return;
        }

        var user = new User(req.body);

        user.save(function(err) {
          if(err) {
            res.json({
              error: true,
              message: 'Error saving user.',
              stack: err
            });
            return;
          }

          res.json({
            error: false,
            message: 'User saved.',
            user: user
          })
        });
      });
  },

  removeUser: function(req, res) {
    User.remove()
    .where('username', req.params.username)
    .exec(function(err) {
      if(err) {
        res.json({
          error: true,
          stack: err
        });
        return;
      }

      res.json({
        error: false,
        message: 'User deleted.'
      });
    });
  }

}

var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var Image = require('../models/Image');

module.exports = {
  //get all images
  getAll: function(req, res) {
    Image.find()
      .sort('uploaded_on')
      .exec(function(err, images) {
        if(err) {
          res.json({
            error: true,
            stack: err
          });
          return;
        }

        if(images) {
          res.json({
            error: false,
            images: images
          });
        } else {
          res.json({
            error: true,
            message: "No images found."
          });
        }
      });
  },

  //get image by id
  getById: function(req, res) {
    Image.findOne()
      .where('_id', req.params.id)
      .exec(function(err, image) {
        if(err) {
          res.json({
            error: true,
            stack: err
          });
          return;
        }
        if(image) {
          res.json({
            error: false,
            image: image
          });
        } else {
          res.json({
            error: true,
            message: "No image found."
          });
        }
      });
  },

  //upload image to cloudinary and save response
  //data and data needed to retrieve to mongo
  upload: function(req, res) {
    cloudinary.uploader.upload(req.files[0].path, function(result) {
      var image = new Image({
        name: result.original_filename,
        description: req.body.description,
        uploaded_on: result.created_at,
        image: result
      });

      image.save(function(err) {
        if(err) {
          res.json({
            error: true,
            stack: err
          });
          return;
        }

        res.json({
          error: false,
          message: "Upload successful.",
          stack: image
        });
      });
    });
  },

  //delete image from mongo
  //and clean up on cloudinary
  remove: function(req, res) {
    cloudinary.uploader.destroy(req.params.pid, function(result) {
      //remove from db
      Image.remove({ 'image.public_id': req.params.pid })
        .exec(function(err) {
          if(err) {
            res.json({
              error: true,
              stack: err
            });
          }

          res.json({
            error: false,
            message: 'Successfully removed image.'
          });
        });
    }, { invalidate: true });
  }
}

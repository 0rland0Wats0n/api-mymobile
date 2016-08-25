var express = require('express');
var router = express.Router();

var images = require('./images');
var users = require('./users');

router.get('/api/images', images.getAll);
router.get('/api/images/:id', images.getById);
router.delete('/api/images/:pid', images.remove);
router.post('/api/image', images.upload);

router.get('/api/users', users.getAll);
router.post('/api/user', users.createUser);
router.delete('/api/user/:username', users.removeUser);

module.exports = router;

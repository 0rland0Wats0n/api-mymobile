var express = require('express');
var router = express.Router();

var authenticate = require('./authenticate');
var images = require('./images');
var users = require('./users');

router.post('/authenticate', authenticate.authenticate);

router.get('/api/images', images.getAll);
router.get('/api/images/:id', images.getById);
router.delete('/api/v1/images/:pid', images.remove);
router.post('/api/v1/image', images.upload);

router.get('/api/users', users.getAll);
router.post('/api/v1/user', users.createUser);
router.delete('/api/v1/user/:username', users.removeUser);

module.exports = router;

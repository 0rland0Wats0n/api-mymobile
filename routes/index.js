var express = require('express');
var router = express.Router();

var images = require('./images')

router.get('/api/images', images.getAll);
router.get('/api/images/:id', images.getById);
router.delete('/api/images/:pid', images.remove);
router.post('/api/image', images.upload);

module.exports = router;

require('dotenv');

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');

var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dq5pfpgsl',
  api_key: "283777418598818",
  api_secret: "mk-SWieerp6TDpOQa-TNI5jG5Vw"
});

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/mymobile');

var routes = require('./routes');

var app = express();
var upload = multer({ dest: './uploads' });

//set secret
app.set('superSecret', require('./middleware/secret'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.all('/*', upload.array('file'), function(req, res, cb) {
	//CORS headers
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

	//set some custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if(req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		cb();
	}
});

app.use('/', routes);

module.exports = app;

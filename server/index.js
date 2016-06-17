'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var models = require('./models');

// body parsing middleware
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.use(morgan('dev')); // logging middleware
app.use(express.static(path.join(__dirname, '../','www/'))); // serves up static files from public folder

app.use('/app', require('./routes'));
app.use('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../','www/index.html'));
});

// start the server
models.db.sync() //{ force: true }
.then(function() {
	app.listen(3000, () => console.log('listening on port 3000...'));
})
.catch(console.error);


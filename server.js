(function(){
  "use strict";
	//var clear = require('clear');
	//clear();
  console.log(123);
	var express = require('express');
	var app = express();
	var path = require('path');
  var fs = require('fs');
  var _ = require('lodash');

  app.use('/src', express.static(__dirname + '/src'));
	app.use('/templates', express.static(__dirname + '/src/templates'));
  app.use('/vendor', express.static(__dirname + '/bower_components'));
  app.use('/scripts', express.static(__dirname + '/src/scripts'));
  app.use('/dist', express.static(__dirname + '/dist'));

  app.get('/', function(req, res){
		res.sendFile(__dirname + '/src/index.html');
	});

  app.get('/timezones', (req, res) => {
    var timezones = JSON.parse(fs.readFileSync('timezones.json', 'utf8'));
    res.json(timezones);
  })

  var server = app.listen(process.env.PORT || 3200, function(){
    console.log("Listening @ " + (process.env.PORT || 3200));
  });
})();
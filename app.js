
var express = require('express');
var http = require('http');
var path = require('path');
var port = process.env.PORT || 8080;
var $ = require('jquery');
var app = express();
var server = http.createServer(app);

// setting the port to 8080
app.set('port', port);

// Renders index.html on load
app.use(express.static('public')); 
// app.use('/', express.static(path.resolve(__dirname, '/public')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(app.get('port'), function(){
	console.log('Weather App is running on port ' + app.get('port'));
});
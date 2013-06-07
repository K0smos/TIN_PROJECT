/*jshint node: true */
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    io = require('socket.io');

		
var server = http.createServer(function (req, res) {
	'use strict';
    
	var filePath = '.' + req.url,
        contentType = 'text/html',
        extName;
		
	console.log('request starting...' + filePath);
    
	if (filePath === './') {
        filePath = './index.html';
    }
    extName = path.extname(filePath);
    switch (extName) {
    
	case '.js':
        contentType = 'text/javascript';
        break;
    
	case '.css':
        contentType = 'text/css';
        break;
    }

	path.exists(filePath, function (exists) {
	
	
	});
	
	
	
	
});	

	
var socket = io.listen(server);




socket.on('connection', function (client) {

}


server.listen(3030);
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
		


}	
	
	
var socket = io.listen(server);




socket.on('connection', function (client) {

}


server.listen(3030);
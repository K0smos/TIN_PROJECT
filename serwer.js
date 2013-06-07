/*jshint node: true */
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    io = require('socket.io');

	
var socket = io.listen(server);

server.listen(3030);
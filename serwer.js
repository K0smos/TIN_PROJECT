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
	if (exists) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.end(content, 'utf-8');
                }
            });
        } else {
            res.writeHead(404);
            res.end();
        }
	
	});	
});	

	
var socket = io.listen(server);

var task = [
    {nazwa: "Wyslac FV", data: "2013-01-31", time: "15:00", user: 'Marek', status: 0},
    {nazwa: "17ta, sms szef", data: "2013-01-29", time: "13:30", user: 'Marek', status: 0},
    {nazwa: "Pion, odebrac dokumenty", data: "2013-01-31", time: "20:00", user: 'Robert', status: 0}
    
];

var users = [
    {nazwa: 'Marek'},
    {nazwa: 'Robert'}

];

var swch = 0;

socket.on('connection', function (client) {
	'use strict';
    swch = 0;
	
	client.on('setUser', function(data){
        for(var i=0; i<users.length; i++){
            if(users[i].nazwa===data){
                swch = 1;
            }
        }
        if(swch===1){
            client.emit('newTask', task);
			client.emit('newTaskPriv', taskPriv);
        }else{
            client.emit('zlyLogin', "z³a nazwa u¿ytkownika");
        }
    });
	
	client.on('addTask', function (data){
        task.push(data);//dodaje do tablicy nowe zadanie
        client.broadcast.emit('newTask', task);
        client.emit('newTask', task);
    });
	
	client.on('change', function (data){
        if(task[data].status===0){
            task[data].status=1;
            client.emit('newTask', task);
           client.broadcast.emit('newTask', task);
        }else{
            task[data].status=0;
            client.emit('newTask', task);
           client.broadcast.emit('newTask', task);
        }
    });
	
});


server.listen(3030);
$(document).ready(function () {
	'use strict';
    var socket = io.connect(),
        myName = '';
	
	$('#addTask').hide();
    $('#taska').hide();
	$('#zegar').show();
	$('#piv').hide();
	$('#privv').hide();
    console.log('connecting…');
	
	socket.on('connect', function () {
        console.log('connected!');
    });

	socket.on('zlyLogin', function(msg){
        $('#login').append('<br><font size="2">'+msg+'</font>');
    });
	
	socket.on('newTime', function(time){
        $('#zegar').html('<br><font size="2">'+time+'</font>');
    });
	
	socket.on('newTask', function(data){
		$('#privv').show();
		$('#piv').html('');
		$('#piv').show();
		
	
	
	});
	
	
	
	
	
	
	
	
	
	
	
});
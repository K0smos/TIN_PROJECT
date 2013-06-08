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

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
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
		console.log("new task");
        $('#active').html('');
        $('#history').html('');
		
		var dzisiaj = new Date();
		var dzisiajStr = dzisiaj.getFullYear() + '-' + dzisiaj.getMonth() + '-' + dzisiaj.getDate();
		
		for(var i=0; i<data.length; i++){
			if(data[i].status===0){
                var dataZadania = new Date(data[i].data);   
                var dataZadaniaStr = dataZadania.getFullYear() + '-' + dataZadania.getMonth() + '-' + dataZadania.getDate();
                
				if(dzisiajStr>dataZadaniaStr){
                    
					if((data[i].user===myName)){
                        $('#active').append('<li id="'+i+'" class="arv"><div id="pole" class="'+i+'"<p><center>'+data[i].nazwa+'</center><br><b>'+ data[i].data+'&nbsp; '+data[i].time+'</b><span class="user">'+data[i].user+'</span></p></div></li>');
                    }else{
                        $('#active').append('<li id="'+i+'" class="arv"><div id="pole" class="'+i+'"<p><center>'+data[i].nazwa+'</center><br><b>'+ data[i].data+'&nbsp; '+data[i].time+'</b><span class="user2">'+data[i].user+'</span></p></div></li>');
                    }
                }else{
                    
					if(data[i].user===myName){
                        $('#active').append('<li id="'+i+'"><div id="pole" class="'+i+'"<p><center>'+data[i].nazwa+'</center><br><b>'+ data[i].data+'&nbsp; '+data[i].time+'</b><span class="user">'+data[i].user+'</span></p></div></li>');
                    
					}else{
                        $('#active').append('<li id="'+i+'"><div id="pole" class="'+i+'"<p><center>'+data[i].nazwa+'</center><br><b>'+ data[i].data+'&nbsp; '+data[i].time+'</b><span class="user2">'+data[i].user+'</span></p></div></li>');
                    }								
				}
            
			}else {
                $('#history').append('<li id="'+i+'"><div id="pole" class="'+i+'"><p><center>'+data[i].nazwa+'</center><br><b>'+ data[i].data+'</b><span class="user2">'+data[i].user+'</span></p></div>&nbsp;<button id="del" class="'+i+'">-</button></li>');		
			}
        }
	
		$('#black').hide();
        $('#addTask').show();
        $('#taska').show();
		
        $("li #pole").click(function (){
            socket.emit('change', $(this).attr('class'));
        });

        $('li #del').click(function (){
            socket.emit('delete', $(this).attr('class'));
        });
	
	
	});
	
	
});
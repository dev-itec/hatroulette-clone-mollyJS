const _state = new Object();

waitPeer = function( _id ){
	ajax.get(`/wait?id=${_id}`)
	.then( async(response)=>{
		const data = await response.text();
		if( data !== '' ){
			console.log( 'connecting to:', data );
			console.log( _state.peerMediaStream );
			webPeer.connect( _state.peer, data, _state.peerMediaStream );
		} else { 
			console.log('waiting for a new peer'); 
			console.log( _state.peerMediaStream );
			webPeer.recive( _state.peer, _state.peerMediaStream );
		}
	})
} 

disconnected = function(){ 
	_state.peerClient.close();	
	_state.peer.destroy(); clear(); 
	$('#bt_next').innerHTML = 'disconnected';
}

createPeer = function(){
	
	_state.IP = Date.now();
	_state.peer = webPeer.createPeer( _state.IP );
		
	_state.peer.on('open',( client )=>{	
		
		_state.peerClient = client; connected();
		$('#bt_next').innerHTML = 'connected';	
		
		_state.peer.on('data',(msg)=>{ recived(msg); });
		
		client.on('close',()=>{ disconnected();	});
		client.on('error',()=>{ disconnected(); });
		client.on('disconnected',()=>{ disconnected(); });
				
	});
	
	_state.peer.on('stream',(data)=>{
		$('#vid-gss').srcObject = data;
		$('#vid-gss').play();
	});
	
	_state.peer.on('close',()=>{ disconnected(); });
	_state.peer.on('error',(err)=>{ disconnected(); });
	_state.peer.on('disconnected',()=>{ disconnected(); });
	
}

addEvent( window, 'load', async ()=>{
	
	device.getCamera({ audio:false, video:true })
	.then( (data)=>{
		_state.peerMediaStream = data;
		$('#vid-own').srcObject = data;
		$('#vid-own').play();	
		connect_button();	
	}).catch( e=>{ console.log(e)
		alert('camera not found')
	})
	

})
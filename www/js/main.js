const _state = new Object();

waitPeer = function( _id ){
	ajax.get(`/wait?id=${_id}`)
	.then( async(response)=>{
		const data = await response.text();
		if( data !== '' ){
			webPeer.connect( _state.peer, data, _state.peerMeadiaStream );
		} else console.log('waiting for a new peer');
	})
} 

disconnected = function(){ 
	clear(); 
	$('#bt_next').innerHTML = 'disconnected';
	_state.peer.destroy(); delete _state.peer;	
}

createPeer = function(){
	
	_state.IP = Date.now();
	_state.peer = webPeer.createPeer( _state.IP );
	webPeer.recive( _state.peer, _state.peerMeadiaStream );
		
	_state.peer.on('connection',( client )=>{	
	
		_state.peer.on('open',()=>{
			_state.peerClient = client; connected();
			$('#bt_next').innerHTML = 'connected';
		});
		
		_state.peer.on('data',(msg)=>{ recived(msg); });
		
		_state.peer.on('stream',(data)=>{
			$('#vid-gss').srcObject = data;
			$('#vid-gss').play();
		});
		
	});
	
	_state.peer.on('disconnected',()=>{ 
		UIkit.notification( 'Peer Disconnected' , {status: 'primary'});
		disconnected(); 
	});
	_state.peer.on('error',(err)=>{ disconnected(); });
	_state.peer.on('close',()=>{ disconnected(); });
	
}

addEvent( window, 'load', async ()=>{
	
//	_state.IP = await device.getIP();
//	_state.IP = CryptoJS.SHA256(_state.IP.query).toString();
	
	device.getCamera({audio:false,video:true}).then( (data)=>{
		_state.peerMeadiaStream = data;
		$('#vid-own').srcObject = data;
		$('#vid-own').play();		
	}).catch( e=>{ alert('camera not found') } )
	

})
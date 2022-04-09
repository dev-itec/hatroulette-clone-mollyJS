res.send( 200,`
	
//	'use strict';
	
	//TODO: MINI Scripts XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
		
	//TODO: Query Variables  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//

	const query = new URLSearchParams( window.location.search );	
	
	//TODO: Events  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
		
	const removeEvent = function( args ){ args[0].removeEventListener( args[1],args[2],true ); return args; }
	const addEvent = function( ...args ){ args[0].addEventListener( args[1],args[2],true ); return args; }
	
	//TODO: Element Modifier XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
	
	const replaceElement = function(...args){ args[1].parentElement.replaceChild( args[0],args[1] ); }
	const removeElement = function(...args){ args[0].parentElement.removeChild( args[0] ); }
	const createElement = function(...args){ return document.createElement(args); }
	const appendElement = function(...args){ return args[0].appendChild(args[1]); }
	
	//TODO: Dom Modifier XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
		
	const $$= function(...args){ return document.querySelectorAll(args); }
	const $ = function(...args){ return document.querySelector(args); }
	
	//TODO: ajax Modifier   XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	const ajax = new Object();
	
	ajax.put = function( _url,_obj ){
		if( typeof( _obj ) !== 'object' ) _obj = new Object();
		_obj.method = 'PUT'; return fetch( _url,_obj );
	}
	
	ajax.get = function( _url,_obj ){
		if( typeof( _obj ) !== 'object' ) _obj = new Object();
		_obj.method = 'GET'; return fetch( _url,_obj );
	}
	
	ajax.patch = function( _url,_obj ){
		if( typeof( _obj ) !== 'object' ) _obj = new Object();
		_obj.method = 'PATCH'; return fetch( _url,_obj );
	}
	
	ajax.delete = function( _url,_obj ){
		if( typeof( _obj ) !== 'object' ) _obj = new Object();
		_obj.method = 'DELETE'; return fetch( _url,_obj );
	}
		
	ajax.post = function( _url,_body,_obj ){
		if( typeof( _obj ) !== 'object' ) _obj = new Object();
		if( _body !== undefined ) _obj.body = _body; 
		_obj.method = 'POST'; return fetch( _url,_obj );
	}
	
	//TODO: Require Function XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
	
	const require = function( _url ){ try{
		if( _url ){
			ajax.get( _url )
			.then( async response=>{
				eval ( await response.text() );	
			});
			
		//	const xhttp = new XMLHttpRequest();
		//	xhttp.onload = function(){ eval(this.responseText); }
		//	xhttp.open("GET", _url, true); xhttp.send();
		}
	} catch(e){ console.error(e) }}
	
	//TODO: DEVICE DETECTION XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
	
	const device = new Object();
	
	device.isMobile = function(){
		const match = [ /Windows Phone/i, /BlackBerry/i, /Android/i, /iPhone/i, /webOS/i, /iPad/i, /iPod/i ];
		return match.some( (item) => {
		    return navigator.userAgent.match( item );
		});
	}
	
	device.getBrowser = function(){
		const match = [ /Chrome/i, /Safari/i, /Opera/i, /Mozilla/i, ];
		
		var output = 'generic';
		for( var i in match ){		
			if( navigator.userAgent.match(match[i]) ){
				output = match[i]; break;
			}	continue;
		}	return output;
			
	}
	
	device.getDevice = function(){
		const match = [ 
			/Windows Phone/i, /BlackBerry/i, /Android/i,
			/iPhone/i, /webOS/i, /iPad/i, 
			/iPod/i, /Linux/i, /MacOS/i,
			/windows/i, /ChromeOS/i,
		];	var output = 'generic';
		
		for( var i in match ){
			let data = navigator.userAgent.match(match[i])
			if( navigator.userAgent.match(match[i]) ){
				output = data[0]; break;
			}	continue;
		}	return output;
		
	}
	
	device.getSize = function( _bool ){
		const size = [ 
			[150,'small'],
			[480,'medium'],
			[640,'xlarge'],
			[720,'xxsmall'],
		];
		
		for( var i=size.length; i--; ){
			if ( window.innerWidth>size[i][0] )	
				return !_bool ? size[i][1] : i;
		}
		
	}
	
	//TODO: IP  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	device.getIP = async function( _ip='' ){
		const response = await ajax.get('http://ip-api.com/json/'+_ip);
		return await response.json();
	}
	
	//TODO: Web Mobile Sensors  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //

	device.gyroscope = function( callback ){ 
		if( !window.DeviceOrientationEvent ) 
			return ' gyroscope is not supported ';		
		addEvent( window,'deviceorientation', (event)=>callback(event) );
	}
	
	device.accelerometer = function( callback ){ 
		if( !window.DeviceMotionEvent )
			return ' Accelerometer is not supported ';		
		addEvent( window,'deviceorientation', (event)=>callback(event) ); 
	}
	
	device.geolocation = function( _obj ){
		if( !window.navigator.geolocation )
			return ' geolocation is not supported ';
			
		if( typeof( _obj ) !== 'object' ){ _obj = new Object();	
		 	_obj.enableHighAccuracy = true;
		  	_obj.timeout = 5000;
		  	_obj.maximumAge = 0;
		}	
	
		const promise = new Promise( function(res,rej){
			navigator.geolocation.getCurrentPosition( res,rej,_obj );
		});	return promise;
	}
	
	//TODO: Desktop XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
		
	device.getScreen = function( _obj ){
		if( !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) )
			return 'screen recorder is not suported';

		if( typeof( _obj ) !== 'object' ){ 
			_obj = new Object();	
			_obj.video = true; 
			_obj.audio = true;
		}	
		
		return navigator.mediaDevices.getDisplayMedia( _obj );
	}
	
	//TODO: Camera  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
		
	device.getCamera = function( _obj ){
		if( !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) )
			return 'camera is not suported';

		if( typeof( _obj ) !== 'object' ){ 
			_obj = new Object();	
			_obj.video = true; 
			_obj.audio = true;
		}	
		
		return navigator.mediaDevices.getUserMedia( _obj );
	}
	
	//TODO: Microphone  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
		
	device.getMicrophone = function( _obj ){
		if( !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) )
			return 'microphone is not suported';

		if( typeof( _obj ) !== 'object' ){ 
			_obj = new Object();	
			_obj.video = false;
			_obj.audio = true;
		}	
		
		return navigator.mediaDevices.getUserMedia( _obj );
	}
	
	//TODO: Record Element  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //

	device.stopRecording = function( _recorder ){ _recorder.mediaRecorder.stop(); }
	device.startRecording = function( _recorder ){
   		const mediaRecorder = new MediaRecorder( _recorder );
			  _recorder.mediaRecorder = mediaRecorder;
		const data = new Array();

		_recorder.mediaRecorder.ondataavailable = (event)=>{
			data.push( event.data );
		};	_recorder.mediaRecorder.start();
		
		var promise = new Promise( (res,rej)=>{
			_recorder.mediaRecorder.onerror = (err)=> rej(err);
			_recorder.mediaRecorder.onstop = ()=>res(data);
		});	return promise;
	}
	
	device.saveRecord = function( _blobs,_name ){ 	
		var _blob = new Blob( _blobs, {'type':_blobs[0].type});	
		var url = URL.createObjectURL( _blob );
		var a = createElement('a');
		$('body').appendChild(a);
			a.setAttribute('download',_name);
			a.setAttribute('href',url);
			a.style = "display: none";
			a.click();
		URL.revokeObjectURL(url);
		$('body').removeChild(a);
	}

	//TODO: WebVAST Support XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
		
	const webVAST = new Object();
	
	//TODO: WebHLS Support  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	const webHLS = new Object();
	
	webHLS.play = function( _video, _url ){
		if( _video.canPlayType('application/vnd.apple.mpegurl' )) 
			_video.src = _url;
		else if ( Hls.isSupported() ) {
			const hls = new Hls(); hls.loadSource( _url ); hls.attachMedia( _video );
		}
	}
	
	//TODO: WebP2P  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	const webPeer = new Object();
	
	webPeer.createPeer = function( ...args ){

		const _obj = new Peer(args);
		
		_obj.event = _obj.on;
		_obj.onopen = function(){return undefined;}
		_obj.onerror = function(){return undefined;}
		_obj.onclose = function(){return undefined;}
		_obj.onstream = function(){return undefined;}
		_obj.onmessage = function(){return undefined;}
		_obj.onconnected = function(){return undefined;}
		_obj.onconnection = function(){return undefined;}
		_obj.ondisconnected = function(){return undefined;}
		
		_obj.on = (...args)=>{ switch( args[0] ){
			case 'load' : _obj.onload = args[1]; break;
			case 'open' : _obj.onopen = args[1]; break;
			case 'error': _obj.onerror = args[1]; break;
			case 'close': _obj.onclose = args[1]; break;
			case 'data' : _obj.onmessage = args[1]; break;
			case 'stream' : _obj.onstream = args[1]; break;
			case 'connection' : _obj.onconnection = args[1]; break;
			case 'disconnected' : _obj.ondisconnected = args[1]; break;
		}};	return _obj;
		
	}
	
	webPeer.recive = function( _peer, _mediaStream ){
	
		_peer.event('call',(_call)=>{	
			if( _mediaStream!==undefined ) 
				_call.answer( _mediaStream );
			_call.on('stream', (data)=>_peer.onstream(data) );
		});
	
		_peer.event('disconnected', ()=>_peer.ondisconnected());
		_peer.event('stream', (data)=>_peer.onstream(data));
		_peer.event('data', (msg)=>_peer.onmessage(msg));
		_peer.event('error', (err)=>_peer.onerror(err));
		_peer.event('close', ()=>_peer.onclose());

		_peer.event('connection', (_conn)=>{
			_conn.on('open', ()=>{
				_conn.on('disconnected', ()=>_peer.ondisconnected());
				_conn.on('stream', (data)=>_peer.onstream(data));
				_conn.on('data', (msg)=>_peer.onmessage(msg));
				_conn.on('error', (err)=>_peer.onerror(err));
				_conn.on('close', ()=>_peer.onclose());	
				_peer.onopen(_conn);
			});
			
		});
		
	}
	
	webPeer.connect = function( _peer, _peerID ,_mediaStream ){
		
		if( _mediaStream!==undefined ){
			const _call = _peer.call(_peerID, _mediaStream);
			_call.on('stream', (data)=>_peer.onstream(data) );
		}
	
		_peer.event('disconnected', ()=>_peer.ondisconnected());
		_peer.event('stream', (data)=>_peer.onstream(data));
		_peer.event('data', (msg)=>_peer.onmessage(msg));
		_peer.event('error', (err)=>_peer.onerror(err));
		_peer.event('close', ()=>_peer.onclose());

		const _conn = _peer.connect( _peerID );
		_conn.on('open',()=>{ 
			_conn.on('disconnected', ()=>_peer.ondisconnected());
			_conn.on('stream', (data)=>_peer.onstream(data));
			_conn.on('data', (msg)=>_peer.onmessage(msg));
			_conn.on('error', (err)=>_peer.onerror(err));
			_conn.on('close', ()=>_peer.onclose());
			_peer.onopen(_conn);
		});
	}

	//TODO: WebSocket OBJECT XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX//
	
	const webSocket = new Object();
	
	webSocket.addClient = ( _url,_opt )=>{ 
	
		if( !window.WebSocket )
			return 'Websocket not suported';
		
		const _obj = new WebSocket( _url ); 
		
		if( typeof(_opt) == 'object' ){
			const keys = Object.keys(_opt);
			keys.map( x=>{ _obj[x] = _opt[x] });
		}
			
		_obj.on = (...args)=>{ switch( args[0] ){
			case 'open' : _obj.onopen = args[1]; break;
			case 'error': _obj.onerror = args[1]; break;
			case 'close': _obj.onclose = args[1]; break;
			case 'data' : _obj.onmessage = args[1]; break;
		}};	return _obj;
		
	}
	
	//TODO: Lazy Load Fuction   XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	const config = { rootMargin:'250px 0px' };
	const observer = new IntersectionObserver( (entries, observer)=>{
		entries.forEach( entry=>{
			const object = entry.target;
			const placeholder = object.src;
			if( entry.isIntersecting ){
				object.src = object.dataset.src;
				observer.unobserve( object );
				addEvent(object,'error',()=>{try{
					const newImage = createElement('img');
						  newImage.setAttribute('src',placeholder);
					replaceElement( newImage,object );
				}catch(e){ }});
			}
		});
	}, config); 
	
	const lazyContent = function(){
		$$('img[data-src]').forEach( item=>observer.observe(item));		
	}
	
	//TODO: Load Component Fuction  XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	
	const loadComponents = async function(){ try{
	
		const renders = $$('component[path]'); 
		if( !(renders.length>0) ){ return lazyContent(); }
		
		const response = await ajax.get( renders[0].getAttribute('path') )
		const element = createElement('div');
			  element.setAttribute('class',renders[0].getAttribute('class'));
			  element.setAttribute('style',renders[0].getAttribute('style'));
			  element.setAttribute('id',renders[0].getAttribute('id'));
			  
			  if( !element.style.getPropertyValue('height') )
			 	element.style.setProperty('height','auto');
			  if( !element.style.getPropertyValue('width') )
			  	element.style.setProperty('width','100%');
			  
			  element.innerHTML = await response.text();
		
		const data = new Array();
		const script = element.querySelectorAll('script');
		
		for( var i=script.length; i--; ){
			data.push([
				script[i].getAttribute('src'),
				script[i].innerText,
			]);	script[i].remove();
		}	replaceElement( element,renders[0] );
		
		data.forEach( x=>{ require( x[0] );
			eval( 'try{'+x[1]+'}catch(e){console.error(e)}' );
		});
		
	} catch(e) { }}
		
	//TODO: OnLoadEvent XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX //
	addEvent( document, 'DOMSubtreeModified', function(){ loadComponents(); });
	addEvent( document, 'DOMContentLoaded', function(){ loadComponents();
		require('https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.1.5-0.canary.8313/hls.min.js');
		require('https://cdnjs.cloudflare.com/ajax/libs/peerjs/2.0.0-beta.3/peerjs.min.js');
		require('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');
		require('https://cdnjs.cloudflare.com/ajax/libs/sharer.js/0.5.1/sharer.min.js'); 
	});
	
	
`,'js' );

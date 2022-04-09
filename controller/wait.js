
if( !(mollyJS.state.waitList.length>0) ){
	mollyJS.state.waitList.push( req.query.id );
	res.send(200,'');
} else {
	let item = mollyJS.state.waitList[0];
	mollyJS.state.waitList.shift(); 
	res.send(200,item);
}

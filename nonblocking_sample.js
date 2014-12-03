function sayHello(seconds){
	console.log("Starting sayHello function");
	setTimeout(function(){
		console.log("Inside SetTimeOut");
	}, seconds*1000);
	console.log("End of sayHello function");
}

sayHello(3)
console.log("Calling sayHello function");
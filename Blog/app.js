var http = require('http');
var url = require('url');
var fs = require('fs');

var newPostFormHtml = fs.readFileSync('views/post/new.html');

function renderNewPost(request, response){
	response.writeHead(200, {
		'Content-type': 'text/html; charset-utf-8'
	});
	response.end(newPostFormHtml);
}

function render404(request, response){
	response.writeHead(400);
	response.end('File not found!')
}

var httpServer = http.createServer(function(request, response){
	var newPostFormRegex = new RegExp('^/posts/new/?$');
	var pathName = url.parse(request.url).pathname;
	if(newPostFormRegex.test(pathName)){
		renderNewPost(request, response)
	}else{
		render404(request, response)
	}
});

httpServer.listen(8000);
console.log('Listening on http://localhost:8000');
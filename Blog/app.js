var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring')

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

function postPost(request, response){
	parseBody(request, function(body){
		var post = {
			title: body.title,
			content: body.content
		}
		console.log("Title:" + post.title + "Content:"+ post.content);
	})
	response.end();
}

function parseBody(request, callback){
	var body = '';
	request.on('data', function(chunk){
		body += chunk;
	});
	request.on('end', function(){
		callback(qs.parse(body))
	})
}

// Router functions
var newPostFormRegex = new RegExp('^/posts/new/?$');
var newPostRegex = new RegExp('^/posts');


// Server functions
var httpServer = http.createServer(function(request, response){

	var pathName = url.parse(request.url).pathname;
	if(newPostFormRegex.test(pathName)){
		renderNewPost(request, response)
	}else if(newPostRegex.test(pathName)){
		postPost(request, response)
	}else{
		render404(request, response)
	}
});

httpServer.listen(8000);
console.log('Listening on http://localhost:8000');
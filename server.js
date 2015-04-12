var connect = require('connect');
var http = require('http');

var app = connect();

app.use('/test', function(req,res) {
	res.writeHead(200, { 'Content-type': 'text-plain'});
	res.end('You made it to test!');
});

app.use(function(req,res) {
	res.writeHead(200, { 'Content-type': 'text-plain'});
	res.end('Hello World');
});

http.createServer(app).listen(80);

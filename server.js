var express = require('express');

var app = express();

var lastreq = '';

// Set the app's port
app.set('port', 80);

app.use('/test', function(req,res) {
	if(req.method == "POST") {
		var requestBody = '';
		req.on('data', function(data) {
			requestBody += data;
			if(requestBody.length > 1e7) {
				res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          			res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
			}
		});
		req.on('end', function() {
			lastreq = JSON.parse(requestBody);
			res.writeHead(200, { 'Content-type': 'text-plain'});
			res.end('Accepted');
		});
	} else {
	res.writeHead(200, { 'Content-type': 'text-plain'});
	res.end('You made it to test!');
	}
});

app.use(function(req,res) {
	res.writeHead(200, { 'Content-type': 'text-plain'});
	if(lastreq == '') {
		res.end('No request sent yet');
	} else {
		res.end(JSON.stringify(lastreq));
	}
});

app.listen(app.get('port'),function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// Create web server 
// 1. Load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

// 2. Create an HTTP server to handle responses
http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('Hello, World.');
            response.end();
            break;
        case '/comments':
            if (request.method === 'POST') {
                var postData = '';
                request.on('data', function (chunk) {
                    postData += chunk.toString();
                });
                request.on('end', function () {
                    var postDataObject = querystring.parse(postData);
                    console.log(postDataObject);
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(postDataObject));
                    response.end();
                });
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write('Comments');
                response.end();
            }
            break;
        default:
            response.writeHead(404);
            response.write('Not found');
            response.end();
            break;
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/');
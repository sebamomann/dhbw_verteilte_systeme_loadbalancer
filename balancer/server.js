const http = require('http');

const requestListener = function (req, res) {
    if (req.url === '/name') {
        res.writeHead(200);
        res.end('Hello, World!');
    } else {
        res.writeHead(404);
        res.end('404 - Not Found');
    }
}

const server = http.createServer(requestListener);
server.listen(8080);


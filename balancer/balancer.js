const http = require('http');

const requestListener = function (client_req, client_res) {
    console.log('serve: ' + client_req.url);

    let options = {
        hostname: 'localhost',
        port: 8080,
        path: client_req.url,
        method: client_req.method,
        headers: client_req.headers,
        body: client_req.body
    };

    let proxy = http.request(options, function (res) {
        client_res.writeHead(res.statusCode, res.headers);
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}

const server = http.createServer(requestListener);
server.listen(80);

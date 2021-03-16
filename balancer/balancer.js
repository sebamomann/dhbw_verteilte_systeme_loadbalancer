const http = require('http');
const configYaml = require("config-yaml");
const config = configYaml(`${__dirname}/config.example.yml`);

console.log(config)

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
const port = config.port || 80;
server.listen(80, () => {
    console.log(`Listening on Port ${port} with ${config.servers.length} servers configured`);
});

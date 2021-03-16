const http = require('http');
require('dotenv').config();
const configYaml = require("config-yaml");
const config = configYaml(process.env.CONFIG_FILE);

let index = 0;

const requestListener = function (client_req, client_res) {
    console.log('serving request to ' + client_req.url);

    let options = {
        hostname: config.servers[index].host,
        port: config.servers[index].port,
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

    index++;
    if (index >= config.servers.length) {
        index = 0;
    }
}

const server = http.createServer(requestListener);
const port = config.port || 80;
server.listen(80, () => {
    console.log(`Listening on Port ${port} with ${config.servers.length} servers configured`);
});

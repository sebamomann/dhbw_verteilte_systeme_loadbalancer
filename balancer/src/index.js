const http = require('http');
require('dotenv').config();
const configYaml = require("config-yaml");
const RoundRobin = require("./RoundRobin");
const config = configYaml(process.env.CONFIG_FILE);

const strategies = {
    'round-robin': RoundRobin
}
if (!strategies[config.strategy]) {
    console.error(`Invalid value for config field 'strategy'`);
    console.error(`Strategy '${config.strategy}' is no valid strategy`);
    console.error('Valid strategies are:');
    for (let strat in strategies) {
        console.error('    ' + strat);
    }
    process.exit(-1);
}
const strategy = new strategies[config.strategy](config.servers);

const requestListener = function (client_req, client_res) {
    console.log('serving request to ' + client_req.url);

    let nextServer = strategy.getNextServer();
    let options = {
        hostname: nextServer.host,
        port: nextServer.port,
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

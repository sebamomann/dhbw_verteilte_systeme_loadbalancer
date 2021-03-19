const http = require('http');
const Configuration = require('./configuration');

const config = new Configuration();

/**
 * Array containing server metrics from all services
 */
const serverMetrics = [];
/**
 * Object containing system metrics from all services
 */
const systemMetrics = [];

const requestListener = function (client_req, client_res) {
    if (client_req.url === '/systemmetrics') {
        client_req.on('data', function (data) {
            data = JSON.parse(data.toString());
            const {name, ...metrics} = data;
            systemMetrics[name] = metrics;
        })
        client_req.on('end', function () {
            client_res.writeHead(204, {})
        })
    } else if (client_req.url === '/servermetrics') {
        client_req.on('data', function (data) {
            data = JSON.parse(data.toString());
            const {name, ...metrics} = data;
            serverMetrics[name] = metrics;
        })
        client_req.on('end', function () {
            client_res.writeHead(204, {})
        })
    } else {
        console.log('serving request to ' + client_req.url);

        let nextServer = config.strategy.getNextServer();
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
}

const server = http.createServer(requestListener);
server.listen(config.port, () => {
    console.log(`Listening on Port ${config.port} with ${config.servers.length} servers configured`);
});

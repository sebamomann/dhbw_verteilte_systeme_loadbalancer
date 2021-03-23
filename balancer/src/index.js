const http = require('http');
const Configuration = require('./configuration');

/**
 * Array containing server metrics from all services
 */
const serverMetrics = [];
/**
 * Object containing system metrics from all services
 */
const systemMetrics = [];

const config = new Configuration();

const redirectRequest = function (client_req, client_res) {
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
    nextServer.metrics.connections++;

    let proxy = http.request(options, function (res) {
        client_res.writeHead(res.statusCode, res.headers);
        res.pipe(client_res, {
            end: true
        });
        nextServer.metrics.connections++;
    });

    client_req.pipe(proxy, {
        end: true
    });
}

http
    .createServer((client_req, client_res) => {
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
            redirectRequest(client_req, client_res);
        }
    })
    .listen(config.port, () => {
        console.log(`Listening on Port ${config.port} with ${config.servers.length} servers configured`);
    });
const http = require('http');
const Configuration = require('./configuration');

const config = new Configuration();

const redirectRequest = function (client_req, client_res) {
    let nextServer = config.strategy.getNextServer(client_req);
    if (!nextServer) {
        console.error('No server available to route request!');
        client_res.writeHead(500);
        client_res.end();
        return;
    }
    let options = {
        hostname: nextServer.host,
        port: nextServer.port,
        path: client_req.url,
        method: client_req.method,
        headers: client_req.headers,
        body: client_req.body,
        maxAttempts: 1
    };
    nextServer.metrics.connections++;

    let proxy = http.request(options, function (res) {
        client_res.writeHead(res.statusCode, res.headers);
        res.pipe(client_res, {
            end: true
        });
        nextServer.metrics.connections--;
    });

    proxy.on('error', function (err) {
        nextServer.available = false;
        let interval = setInterval(() => {
            if (Date.now() - nextServer.lastMetricsUpdate < 5000) {
                nextServer.available = true;
                clearInterval(interval);
            }
        }, 5000);

        nextServer.metrics.connections--;
        redirectRequest(client_req, client_res);
    });

    client_req.pipe(proxy, {
        end: true
    });
}

http
    .createServer((client_req, client_res) => {
        if (client_req.method === 'OPTIONS') {
            client_res.writeHead(200, {
                "Accept": "application/json",
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            client_res.end();
        } else if (client_req.method === 'POST' && client_req.url === '/systemmetrics') {
            client_req.on('data', function (data) {
                data = JSON.parse(data.toString());
                const {name, ...metrics} = data;
                console.log(`Received metric from ` + name)
                let find = config.servers.find(server => server.host === name);
                find.lastMetricsUpdate = Date.now();
                if (find) {
                    find.metrics.memoryUsage = metrics.usedMemoryPercentage;
                }
            })
            client_req.on('end', function () {
                client_res.writeHead(204, {});
                client_res.end();
            })
        } else if (client_req.method === 'GET' && client_req.url === '/servers/metrics') {
            client_res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            let json = JSON.stringify({
                servers: config.servers
            });
            client_res.end(json);
        } else if (client_req.method === 'POST' && client_req.url === '/config') {
            client_req.on('data', function (data) {
                data = JSON.parse(data.toString());
                config.changeStrategy(data.strategy);
            });
            client_req.on('end', function () {
                client_res.writeHead(201, {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                client_res.end();
            });
        } else {
            redirectRequest(client_req, client_res);
        }
    })
    .listen(config.port, '0.0.0.0', () => {
        console.log(`Listening on Port ${config.port} with ${config.servers.length} servers configured`);
    });

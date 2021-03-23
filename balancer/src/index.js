const http = require('http');
const Configuration = require('./configuration');

const config = new Configuration();

const redirectRequest = function (client_req, client_res) {
    console.log('serving request to ' + client_req.url);

    let nextServer = config.strategy.getNextServer(client_req);
    if (!nextServer) {
        console.error('No server available to route to!');
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
        nextServer.metrics.connections++;
    });

    proxy.on('error', function (err) {
        nextServer.available = false;
        setTimeout(() => {
            nextServer.available = true;
        }, 5000);
        client_res.writeHead(500);
        client_res.end();
    });

    client_req.pipe(proxy, {
        end: true
    });
}

http
    .createServer((client_req, client_res) => {
        if (client_req.method === 'POST' && client_req.url === '/systemmetrics') {
            client_req.on('data', function (data) {
                data = JSON.parse(data.toString());
                const {name, ...metrics} = data;
                let find = config.servers.find(server => server.host === name);
                if (find) {
                    find.metrics.memoryUsage = metrics.usedMemoryPercentage;
                }
            })
            client_req.on('end', function () {
                client_res.writeHead(204, {})
            })
        } else {
            redirectRequest(client_req, client_res);
        }
    })
    .listen(config.port, '0.0.0.0', () => {
        console.log(`Listening on Port ${config.port} with ${config.servers.length} servers configured`);
    });

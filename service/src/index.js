const SystemMetricsProvider = require("./systemMetrics.provider");
const ServerMetricsProvider = require("./serverMetrics.provider");

const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('dotenv').config();

const port = 8080;
const serviceName = process.env.NAME;

let server;

let systemMetricsProvider = new SystemMetricsProvider();
let serverMetricsProvider = new ServerMetricsProvider();

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send(`Hello World! My name is: ${serviceName}`)
    }, Math.random() * 10000)
})

app.post('/manipulate/systemmetrics', (req, res) => {
    const body = req.body;

    systemMetricsProvider.setOverride(body);

    res.status(204);
    res.send();
})

app.post('/manipulate/servermetrics', (req, res) => {
    const body = req.body;

    serverMetricsProvider.setOverride(body);

    res.status(204);
    res.send();
})

server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

serverMetricsProvider.setServer(server);

setInterval(() => {
    const systemMetrics = systemMetricsProvider.getMetrics();
    post(systemMetrics, "systemmetrics");

    const callback = (serverMetrics) => {
        post(serverMetrics, "servermetrics");
    }
    serverMetricsProvider.getMetrics(callback);

}, 1000)

function post(data, path) {
    data = {name: serviceName, ...data};

    data = JSON.stringify(data);

    // An object of options to indicate where to post to
    var post_options = {
        host: 'balancer',
        port: '80',
        path: "/" + path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(data);
    post_req.end();

}

const SystemMetricsProvider = require("./systemMetrics.provider");
const ServerMetricsProvider = require("./serverMetrics.provider");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();

const port = 8080;
const name = process.env.NAME;

let server;

let systemMetricsProvider = new SystemMetricsProvider();
let serverMetricsProvider = new ServerMetricsProvider();

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send(`Hello World! My name is: ${name}`)
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
    console.log(systemMetrics);

    const callback = (serverMetrics) => {
        console.log(serverMetrics);
    }

    const serverMetrics = serverMetricsProvider.getMetrics(callback);

}, 500)

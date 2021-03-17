const SystemMetricsProvider = require("./systemMetrics.provider");
const ServerMetricsProvider = require("./serverMetrics.provider");

const express = require('express');
const app = express();

require('dotenv').config();

const port = 8080;
const name = process.env.NAME;

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send(`Hello World! My name is: ${name}`)
    }, Math.random() * 10000)
})

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

let systemMetricsProvider = new SystemMetricsProvider();
let serverMetricsProvider = new ServerMetricsProvider(server);

setInterval(() => {
    const systemMetrics = systemMetricsProvider.getMetrics();
    console.log(systemMetrics);

    const serverMetrics = serverMetricsProvider.getMetrics();
    console.log(serverMetrics);
}, 500)

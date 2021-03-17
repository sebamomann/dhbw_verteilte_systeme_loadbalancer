const SystemMetricsprovider = require("./systemMetrics.provider");

const express = require('express')
const app = express()

require('dotenv').config();

const port = 8080;
const name = process.env.NAME;

let systemMetricsProvider = new SystemMetricsprovider();

app.get('/', (req, res) => {
    res.send(`Hello World! My name is: ${name}`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

setInterval(() => {
    const systemMetrics = systemMetricsProvider.getStatistics();
    console.log(systemMetrics);
}, 1 * 1000)

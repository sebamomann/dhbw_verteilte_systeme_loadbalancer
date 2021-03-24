class Metrics {
    cpuUsage = 0;
    memoryUsage = 0;
    connections = 0;
}

module.exports = class Server {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.available = true;
        this.metrics = new Metrics();
        this.lastMetricsUpdate = 0;
    }
}

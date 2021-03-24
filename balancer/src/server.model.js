class Metrics {
    cpuUsage = 0;
    memoryUsage = 0;
    connections = 0;
}

module.exports = class Server {
    constructor(host, port,name) {
        this.host = host;
        this.name = name;
        this.port = port;
        this.available = true;
        this.metrics = new Metrics();
        this.lastMetricsUpdate = 0;
    }
}

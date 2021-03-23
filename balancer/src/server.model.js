class Metrics {
    constructor(

    ) {
        this.cpuUsage = 0;
        this.memoryUsage = 0;
        this.connections = 0;
    }
}

module.exports = class Server {
    constructor(
        host,
        port
    ) {
        this.host = host;
        this.port = port;
        this.metrics = new Metrics();
    }
}

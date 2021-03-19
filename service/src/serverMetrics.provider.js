const ServerMetrics = require("./serverMetrics.model")

module.exports = class ServerMetricsProvider {
    server;
    currentCount = 0;

    override = {};

    constructor() {
    }

    getMetrics(callback) {
        const privateCallback = () => {
            const metrics = new ServerMetrics();
            metrics.numberOfConnections = this.currentCount;

            Object.assign(metrics, this.override);

            callback(metrics);
        }

        this.updateConnectionCount(privateCallback);
    }

    updateConnectionCount(callback) {
        this.server
            .getConnections((err, count) => {
                    this.currentCount = count;

                    callback();
                }
            );
    }

    setServer(server) {
        this.server = server;
    }

    setOverride(body) {
        this.override = body;
    }
}

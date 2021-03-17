const ServerMetrics = require("./serverMetrics.model")

module.exports = class ServerMetricsProvider {
    server;
    currentCount = 0;

    constructor(server) {
        this.server = server;
    }

    /**
     * Note that this metric is shifted by the update interval.
     * Each time this function is called, the connection count is updated, but returns the current value.
     *
     * @return {module.ServerMetrics}
     */
    getMetrics() {
        this.updateConnectionCount();

        const metrics = new ServerMetrics();
        metrics.numberOfConnections = this.currentCount;

        return metrics;
    }

    updateConnectionCount() {
        this.server
            .getConnections((err, count) => {
                    this.currentCount = count;
                }
            );
    }
}

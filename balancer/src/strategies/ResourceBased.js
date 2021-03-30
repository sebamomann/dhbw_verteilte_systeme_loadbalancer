const Strategy = require("../strategy");

module.exports = class ResourceBased extends Strategy {
    getNextServer() {
        let servers = this.servers.filter(server => server.available);
        let server = servers[0];
        for (const s of servers) {
            if (s.metrics.memoryUsage < server.metrics.memoryUsage) {
                server = s;
            }
        }
        return server;
    }
}

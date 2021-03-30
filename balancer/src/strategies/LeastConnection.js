const Strategy = require("../strategy");

module.exports = class LeastConnection extends Strategy {
    getNextServer() {
        let servers = this.servers.filter(server => server.available);
        let server = servers[0];
        for (const s of servers) {
            if (s.metrics.connections < server.metrics.connections) {
                server = s;
            }
        }
        return server;
    }
}

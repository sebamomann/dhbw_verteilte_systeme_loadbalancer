const Strategy = require("../strategy");

module.exports = class LeastConnection extends Strategy {
    constructor(servers) {
        super(servers);
    }

    getNextServer() {
        let server = this.servers[0];
        for (const s of this.servers) {
            if (s.metrics.connections < server.metrics.connections) {
                server = s;
            }
        }
        return server;
    }
}

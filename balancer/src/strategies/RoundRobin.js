const Strategy = require("../strategy");

module.exports = class RoundRobin extends Strategy {
    index = 0;

    constructor(servers) {
        super(servers);
    }

    getNextServer() {
        let servers = this.servers.filter(server => server.available);
        if (this.index >= servers.length) {
            this.index = 0;
        }
        let server1 = servers[this.index];
        this.index++;
        return server1;
    }
}

const Strategy = require("../strategy");

module.exports = class RoundRobin extends Strategy {
    index = 0;

    constructor(servers) {
        super(servers);
    }

    getNextServer() {
        let servers = this.servers.filter(server => server.available);
        let server1 = servers[this.index];
        this.index++;
        if (this.index >= servers.length) {
            this.index = 0;
        }
        return server1;
    }
}

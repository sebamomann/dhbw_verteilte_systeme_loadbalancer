const Strategy = require("./strategy");

module.exports = class RoundRobin extends Strategy {
    index = 0;

    constructor(servers) {
        super(servers);
    }

    getNextServer() {
        let server1 = this.servers[this.index];
        this.index++;
        if (this.index >= this.servers.length) {
            this.index = 0;
        }
        return server1;
    }
}

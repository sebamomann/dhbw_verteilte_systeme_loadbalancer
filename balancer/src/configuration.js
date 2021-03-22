const RoundRobin = require("./strategies/RoundRobin");
const LeastConnection = require("./strategies/LeastConnection");
const Server = require("./server.model");
const configYaml = require("config-yaml");
require('dotenv').config();

module.exports = class Configuration {
    constructor() {
        this.config = configYaml(process.env.CONFIG_FILE, {});
        this.strategies = {
            'round-robin': RoundRobin,
            'least-connection': LeastConnection
        }
    }

    get port() {
        return this.config.port || 80;
    }

    get strategy() {
        if (!this.strategies[this.config.strategy]) {
            console.error(`Invalid value for config field 'strategy'`);
            console.error(`Strategy '${this.config.strategy}' is no valid strategy`);
            console.error('Valid strategies are:');
            for (let strat in this.strategies) {
                console.error('    ' + strat);
            }
            process.exit(-1);
        }
        return new this.strategies[this.config.strategy](this.config.servers);
    }

    get servers() {
        return this.config.servers.map(server => new Server(server.host, server.port));
    }
}

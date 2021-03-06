const RoundRobin = require("./strategies/RoundRobin");
const LeastConnection = require("./strategies/LeastConnection");
const IPHash = require("./strategies/IPHash");
const ResourceBased = require("./strategies/ResourceBased");
const Server = require("./server.model");
const configYaml = require("config-yaml");
require('dotenv').config();

module.exports = class Configuration {
    constructor() {
        this.config = configYaml(process.env.CONFIG_FILE, {});
        this.strategies = {
            'round-robin': RoundRobin,
            'least-connection': LeastConnection,
            'ip-hash': IPHash,
            'resource-based': ResourceBased,
        }

        this._initServers();
        this._initStrategy();
    }

    get port() {
        return this.config.port || 80;
    }

    get strategy() {
        return this._strategy;
    }

    get strategyString() {
        return this.config.strategy;
    }

    get servers() {
        return this._servers;
    }

    _initServers() {
        this._servers = this.config.servers.map(server => new Server(server.host, server.port, server.name));
    }

    _initStrategy() {
        if (!this.strategies[this.config.strategy]) {
            console.error(`Invalid value for config field 'strategy'`);
            console.error(`Strategy '${this.config.strategy}' is no valid strategy`);
            console.error('Valid strategies are:');
            for (let strat in this.strategies) {
                console.error('    ' + strat);
            }
            process.exit(-1);
        }
        this._strategy = new this.strategies[this.config.strategy](this.servers);
    }

    changeStrategy(newStrategy) {
        this.config.strategy = newStrategy;
        this._initStrategy();
        console.log('Changed to strategy', newStrategy);
    }
}

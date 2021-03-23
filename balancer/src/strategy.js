module.exports = class Strategy {
    _servers;

    constructor(servers) {
        this._servers = servers;
    }

    get servers() {
        return this._servers.filter(server => server.available);
    }

    getNextServer(request) {
        throw new Error('Strategy must implement `getNextServer`');
    }
}

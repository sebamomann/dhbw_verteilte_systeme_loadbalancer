module.exports = class Strategy {
    _servers;

    constructor(servers) {
        this.servers = servers;
    }

    getNextServer(request) {
        throw new Error('Strategy must implement `getNextServer`');
    }
}

module.exports = class Strategy {

    constructor(servers) {
        this.servers = servers;
    }

    getNextServer() {
        throw new Error('Strategy must implement `getNextServer`');
    }
}

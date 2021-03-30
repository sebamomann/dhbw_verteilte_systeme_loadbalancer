const Strategy = require("../strategy");
const ipInt = require('ip-to-int');

module.exports = class IPHash extends Strategy {
    getNextServer(request) {
        let ip = request.connection.remoteAddress;
        console.log(ip);
        console.log(ipInt(ip).toInt());
        console.log(ipInt(ip).toInt() % this.servers.length);
        return this.servers[ipInt(ip).toInt() % this.servers.length];
    }
}

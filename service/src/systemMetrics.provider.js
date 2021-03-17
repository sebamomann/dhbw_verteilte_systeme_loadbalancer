const Metrics = require('./systemMetrics.model')
var os = require('os');

module.exports = class SystemMetricsProvider {
    // timeInterval;
    //
    // constructor(updateIntervalInMs) {
    //     this.timeInterval = this.setUpdateCycle(updateIntervalInMs);
    // }

    constructor() {
    }

    getNumberOfCpus() {
        return os.cpus().length;
    }

    getTotalMemory() {
        return os.totalmem();
    }

    getFreeMemory() {
        return os.freemem();
    }

    getUsedMemory() {
        let freeMem = this.getFreeMemory();
        let totalMem = this.getTotalMemory();

        return totalMem - freeMem;
    }

    getUsedMemoryPercentage() {
        let usedMem = this.getUsedMemory();
        let totalMemory = this.getTotalMemory();

        return Math.round((usedMem / totalMemory) * 100);
    }

    // setUpdateCycle(updateIntervalInMs) {
    //     if (this.timeInterval) {
    //         clearInterval(this.timeInterval);
    //     }
    //
    //     return setTimeout(() => {
    //         this.createStatisticObject();
    //     }, updateIntervalInMs);
    // }

    getStatistics() {
        const metrics = new Metrics();

        metrics.numberOfCpus = this.getNumberOfCpus();
        metrics.totalMemory = this.getTotalMemory();
        metrics.freeMemory = this.getFreeMemory();
        metrics.usedMemory = this.getUsedMemory();
        metrics.usedMemoryPercentage = this.getUsedMemoryPercentage();

        return metrics;
    }
}

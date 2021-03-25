const Metrics = require('./systemMetrics.model')
var os = require('os');
var exec = require('child_process').exec;

module.exports = class SystemMetricsProvider {
    // timeInterval;
    //
    // constructor(updateIntervalInMs) {
    //     this.timeInterval = this.setUpdateCycle(updateIntervalInMs);
    // }

    override = {};

    constructor() {
    }

    getNumberOfCpus() {
        return os.cpus().length;
    }

    async getTotalMemory() {
        return new Promise(resolve => {
            exec("cat /sys/fs/cgroup/memory/memory.limit_in_bytes", function (err, stdout, stderr) {
                resolve(stdout);
            });
        });
    }

    async getCpuUsagePercentage() {
        return new Promise(resolve => {
            exec("grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage}'", function (err, stdout, stderr) {
                resolve(stdout);
            });
        });
    }

    async getFreeMemory() {
        const used = await this.getUsedMemory();
        const limit = await this.getTotalMemory();

        return limit - used;
    }

    async getUsedMemory() {
        return new Promise(resolve => {
            exec("cat /sys/fs/cgroup/memory/memory.usage_in_bytes", function (err, stdout, stderr) {
                resolve(stdout);
            });
        });
    }

    async getUsedMemoryPercentage() {
        let usedMem = await this.getUsedMemory();
        let totalMemory = await this.getTotalMemory();

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

    async getMetrics() {
        const metrics = new Metrics();

        metrics.numberOfCpus = this.getNumberOfCpus();
        metrics.totalMemory = await this.getTotalMemory();
        metrics.freeMemory = await this.getFreeMemory();
        metrics.usedMemory = await this.getUsedMemory();
        metrics.usedMemoryPercentage = await this.getUsedMemoryPercentage();
        metrics.cpuUsagePercentage = await this.getCpuUsagePercentage();

        Object.assign(metrics, this.override);

        return metrics;
    }

    setOverride(body) {
        this.override = body;
    }
}

var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var AppPoolManager = (function () {
    function AppPoolManager() {
    }
    AppPoolManager.prototype.addSync = function (options) {
        vsts.debug("Creating AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("add apppool");
        toolRunner.arg("/name:" + options.name);
        toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.execSync();
    };
    AppPoolManager.prototype.removeSync = function (name) {
        vsts.debug("Deleting AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("delete apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.execSync();
    };
    AppPoolManager.prototype.startSync = function (name) {
        vsts.debug("Starting AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("start apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.execSync();
    };
    AppPoolManager.prototype.stopSync = function (name) {
        vsts.debug("Stopping AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("stop apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.execSync();
    };
    AppPoolManager.prototype.setIdentitySync = function (name, identity) {
        vsts.debug("Stopping AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("set config");
        toolRunner.arg("/section:applicationPools");
        toolRunner.arg("/[name='" + name + "'].processModel.identityType:" + identity);
        return toolRunner.execSync();
    };
    AppPoolManager.prototype.existsSync = function (name) {
        vsts.debug("Checking if AppPool exists...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("list apppool");
        toolRunner.arg("/name:" + name);
        return toolRunner.execSync().code === 0;
    };
    return AppPoolManager;
})();
exports.AppPoolManager = AppPoolManager;

var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var SiteManager = (function () {
    function SiteManager() {
    }
    SiteManager.prototype.addSync = function (options) {
        vsts.debug("Creating site...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("add site");
        toolRunner.arg("/name:" + options.name);
        toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.execSync();
    };
    SiteManager.prototype.removeSync = function (name) {
        vsts.debug("Deleting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("delete site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    SiteManager.prototype.startSync = function (name) {
        vsts.debug("Starting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("start site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    SiteManager.prototype.stopSync = function (name) {
        vsts.debug("Stopping site...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("stop site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    SiteManager.prototype.existsSync = function (name) {
        vsts.debug("Checking if site exists...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("list site");
        toolRunner.arg("/name:" + name);
        return toolRunner.execSync().code === 0;
    };
    return SiteManager;
})();
exports.SiteManager = SiteManager;

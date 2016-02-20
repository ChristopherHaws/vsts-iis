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
    return SiteManager;
})();
exports.SiteManager = SiteManager;
// var iis = new IIS();
// 
// iis.createSiteSync({
// 	name: "Foo",
// 	protocol: "https",
// 	host: "*",
// 	port: 433,
// 	path: "C:\\application\\manzanita"
// });
// 
// iis.startSiteSync("Foo");
// iis.stopSiteSync("Foo");
// iis.deleteSiteSync("Foo"); 

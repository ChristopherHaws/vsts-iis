var os = require("os");
var vsts = require("vsts-task-lib/task");
var SiteManagement = (function () {
    function SiteManagement() {
        if (os.arch() === "x64") {
            this.appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
        }
        else {
            this.appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
        }
    }
    SiteManagement.prototype.createSiteSync = function (options) {
        vsts.debug("Creating site...");
        var toolRunner = vsts.createToolRunner(this.appCmdPath);
        toolRunner.arg("add site");
        toolRunner.arg("/name:" + options.name);
        toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.execSync();
    };
    SiteManagement.prototype.deleteSiteSync = function (name) {
        vsts.debug("Deleting site...");
        var toolRunner = vsts.createToolRunner(this.appCmdPath);
        toolRunner.arg("delete site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    SiteManagement.prototype.startSiteSync = function (name) {
        vsts.debug("Starting site...");
        var toolRunner = vsts.createToolRunner(this.appCmdPath);
        toolRunner.arg("start site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    SiteManagement.prototype.stopSiteSync = function (name) {
        vsts.debug("Stopping site...");
        var toolRunner = vsts.createToolRunner(this.appCmdPath);
        toolRunner.arg("stop site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.execSync();
    };
    return SiteManagement;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SiteManagement;
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

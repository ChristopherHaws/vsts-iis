var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var ApplicationManager = (function () {
    function ApplicationManager() {
    }
    ApplicationManager.prototype.addSync = function (options) {
        vsts.debug("Adding app folder...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg('add app');
        toolRunner.arg('/site.name:"' + options.siteName + '"');
        toolRunner.arg('/path:/' + options.virtualPath);
        toolRunner.arg('/physicalPath:"' + options.physicalPath + '"');
        return toolRunner.execSync();
    };
    ApplicationManager.prototype.setAppPoolSync = function (appName, appPoolName) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg('set app');
        toolRunner.arg('/app.name:"' + appName + '"');
        toolRunner.arg('/applicationPool:' + appPoolName);
        return toolRunner.execSync();
    };
    ApplicationManager.prototype.setWindowsAuthenticationSync = function (appPath, enable) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg('set config');
        toolRunner.arg('"' + appPath + '"');
        toolRunner.arg('/section:windowsAuthentication');
        toolRunner.arg('/enabled:"' + enable + '"');
        return toolRunner.execSync();
    };
    ApplicationManager.prototype.setAnonymousAuthenticationSync = function (appPath, enable) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg('set config');
        toolRunner.arg('"' + appPath + '"');
        toolRunner.arg('/section:anonymousAuthentication');
        toolRunner.arg('/enabled:"' + enable + '"');
        return toolRunner.execSync();
    };
    ApplicationManager.prototype.existsSync = function (name) {
        vsts.debug("Checking if site app...");
        var toolRunner = AppCmd.createAppCmdToolRunner();
        toolRunner.arg("list app");
        toolRunner.arg("/name:" + name);
        return toolRunner.execSync().code === 0;
    };
    return ApplicationManager;
})();
exports.ApplicationManager = ApplicationManager;

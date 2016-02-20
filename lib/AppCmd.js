var os = require("os");
var vsts = require("vsts-task-lib/task");
function createAppCmdToolRunner() {
    var appCmdPath = "";
    if (os.arch() === "x64") {
        appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
    }
    else {
        appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
    }
    return vsts.createToolRunner(appCmdPath);
}
exports.createAppCmdToolRunner = createAppCmdToolRunner;

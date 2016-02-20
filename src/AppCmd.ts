import * as os from "os";
import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";

export function createAppCmdToolRunner(): toolRunner.ToolRunner {
	let appCmdPath = "";
	
	if (os.arch() === "x64") {
		appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
	} else {
		appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
	}
	
	return vsts.createToolRunner(appCmdPath);
}
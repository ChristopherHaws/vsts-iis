import * as os from "os";
import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";

export interface Site {
	name: string;
	protocol: string;
	host: string;
	port: number;
	bindings?: string;
	path?: string;
}

export default class SiteManagement {
	private toolRunner: toolRunner.ToolRunner;
	private appCmdPath: string;
	
	constructor() {
		if (os.arch() === "x64") {
			this.appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
		} else {
			this.appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
		}
	}
	
	public createSiteSync(options: Site): toolRunner.IExecResult {
		vsts.debug("Creating site...");
		
		var toolRunner = vsts.createToolRunner(this.appCmdPath);
		toolRunner.arg("add site");
		toolRunner.arg("/name:" + options.name);
		toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
		toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
		
		return toolRunner.execSync();
	}
	
	public deleteSiteSync(name: string): toolRunner.IExecResult {
		vsts.debug("Deleting site...");
		
		var toolRunner = vsts.createToolRunner(this.appCmdPath);
		toolRunner.arg("delete site");
		toolRunner.arg("/site.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public startSiteSync(name: string): toolRunner.IExecResult {
		vsts.debug("Starting site...");
		
		var toolRunner = vsts.createToolRunner(this.appCmdPath);
		toolRunner.arg("start site");
		toolRunner.arg("/site.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public stopSiteSync(name: string): toolRunner.IExecResult {
		vsts.debug("Stopping site...");
		
		var toolRunner = vsts.createToolRunner(this.appCmdPath);
		toolRunner.arg("stop site");
		toolRunner.arg("/site.name:" + name);
		
		return toolRunner.execSync();
	}
}
	
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
import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd"

export interface SiteOptions {
	name: string;
	protocol: string;
	host: string;
	port: number;
	bindings?: string;
	path?: string;
}

export class SiteManager {	
	public addSync(options: SiteOptions): toolRunner.IExecResult {
		vsts.debug("Creating site...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("add site");
		toolRunner.arg("/name:" + options.name);
		toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
		toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
		
		return toolRunner.execSync();
	}
	
	public removeSync(name: string): toolRunner.IExecResult {
		vsts.debug("Deleting site...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("delete site");
		toolRunner.arg("/site.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public startSync(name: string): toolRunner.IExecResult {
		vsts.debug("Starting site...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("start site");
		toolRunner.arg("/site.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public stopSync(name: string): toolRunner.IExecResult {
		vsts.debug("Stopping site...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
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
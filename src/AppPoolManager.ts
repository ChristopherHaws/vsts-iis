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

export class AppPoolManager {	
	public addSync(options: SiteOptions): toolRunner.IExecResult {
		vsts.debug("Creating AppPool...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("add apppool");
		toolRunner.arg("/name:" + options.name);
		toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
		toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
		
		return toolRunner.execSync();
	}
	
	public removeSync(name: string): toolRunner.IExecResult {
		vsts.debug("Deleting AppPool...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("delete apppool");
		toolRunner.arg("/apppool.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public startSync(name: string): toolRunner.IExecResult {
		vsts.debug("Starting AppPool...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("start apppool");
		toolRunner.arg("/apppool.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public stopSync(name: string): toolRunner.IExecResult {
		vsts.debug("Stopping AppPool...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("stop apppool");
		toolRunner.arg("/apppool.name:" + name);
		
		return toolRunner.execSync();
	}
	
	public setIdentitySync(name: string, identity: string): toolRunner.IExecResult {
		vsts.debug("Stopping AppPool...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("set config");
		toolRunner.arg("/section:applicationPools");
		toolRunner.arg("/[name='" + name + "'].processModel.identityType:" + identity);
		
		return toolRunner.execSync();
	}
	
	public existsSync(name: string): boolean {
		vsts.debug("Checking if AppPool exists...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("list apppool");
		toolRunner.arg("/name:" + name);
		
		return toolRunner.execSync().code === 0;
	}
}
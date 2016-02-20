import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd"

export interface ApplicationOptions {
	siteName: string;
	virtualPath: string;
	physicalPath: string;
}

export class ApplicationManager {
	public addSync(options: ApplicationOptions) {
		vsts.debug("Adding app folder...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('add app');
		toolRunner.arg('/site.name:"' + options.siteName + '"');
		toolRunner.arg('/path:/' + options.virtualPath);
		toolRunner.arg('/physicalPath:"' + options.physicalPath + '"');
		
		return toolRunner.execSync();
	}
	
	public setAppPoolSync(appName: string, appPoolName: string): toolRunner.IExecResult {
		vsts.debug("Setting the AppPool for app...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set app');
		toolRunner.arg('/app.name:"' + appName + '"');
		toolRunner.arg('/applicationPool:' + appPoolName);
		
		return toolRunner.execSync();
	}
	
	public setWindowsAuthenticationSync(appPath: string, enable: boolean): toolRunner.IExecResult {
		vsts.debug("Setting the AppPool for app...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:windowsAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');
		
		return toolRunner.execSync();
	}
	
	public setAnonymousAuthenticationSync(appPath: string, enable: boolean): toolRunner.IExecResult {
		vsts.debug("Setting the AppPool for app...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:anonymousAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');
		
		return toolRunner.execSync();
	}
	
	public existsSync(name: string): boolean {
		vsts.debug("Checking if site app...");
		
		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("list app");
		toolRunner.arg("/name:" + name);
		
		return toolRunner.execSync().code === 0;
	}
}
import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd"

export interface ApplicationOptions {
	name: string;
	virtualPath: string;
	physicalPath: string;
}

export class ApplicationManager {
	public add(options: ApplicationOptions) {
		vsts.debug("Adding app folder...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('add app');
		toolRunner.arg('/site.name:"' + options.name + '"');
		toolRunner.arg('/path:/' + options.virtualPath);
		toolRunner.arg('/physicalPath:"' + options.physicalPath + '"');

		return toolRunner.exec();
	}

	public setAppPool(appName: string, appPoolName: string): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set app');
		toolRunner.arg('/app.name:"' + appName + '"');
		toolRunner.arg('/applicationPool:' + appPoolName);

		return toolRunner.exec();
	}

	public setWindowsAuthentication(appPath: string, enable: boolean): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:windowsAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');

		return toolRunner.exec();
	}

	public setAnonymousAuthentication(appPath: string, enable: boolean): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:anonymousAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');

		return toolRunner.exec();
	}

	public exists(name: string): Q.Promise<boolean> {
		vsts.debug("Checking if site app...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("list app");
		toolRunner.arg("/name:" + name);

		var defered = Q.defer<boolean>();

		toolRunner.exec()
			.then(code => {
				defered.resolve(true);
			})
			.fail(reason => {
				defered.resolve(false);
			});

		return defered.promise;
	}
}

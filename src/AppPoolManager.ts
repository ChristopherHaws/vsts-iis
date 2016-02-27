import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd";

export class AppPoolManager {
	public add(name: string): Q.Promise<number> {
		vsts.debug("Creating AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("add apppool");
		toolRunner.arg("/name:" + name);

		return toolRunner.exec();
	}

	public remove(name: string): Q.Promise<number> {
		vsts.debug("Deleting AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("delete apppool");
		toolRunner.arg("/apppool.name:" + name);

		return toolRunner.exec();
	}

	public start(name: string): Q.Promise<number> {
		vsts.debug("Starting AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("start apppool");
		toolRunner.arg("/apppool.name:" + name);

		return toolRunner.exec();
	}

	public stop(name: string): Q.Promise<number> {
		vsts.debug("Stopping AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("stop apppool");
		toolRunner.arg("/apppool.name:" + name);

		return toolRunner.exec();
	}

	public recycle(name: string): Q.Promise<number> {
		vsts.debug("Recycling AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("recycle apppool");
		toolRunner.arg("/apppool.name:" + name);

		return toolRunner.exec();
	}

	public setIdentity(name: string, identity: string): Q.Promise<number> {
		vsts.debug("Stopping AppPool...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("set config");
		toolRunner.arg("/section:applicationPools");
		toolRunner.arg("/[name='" + name + "'].processModel.identityType:" + identity);

		return toolRunner.exec();
	}

	public exists(name: string): Q.Promise<boolean> {
		vsts.debug("Checking if AppPool exists...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("list apppool");
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

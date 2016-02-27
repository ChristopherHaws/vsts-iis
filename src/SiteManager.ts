import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd"
import * as Q from "q";

export interface SiteOptions {
	name: string;
	protocol: string;
	host: string;
	port: number;
	bindings?: string;
	path?: string;
}

export class SiteManager {
	public add(options: SiteOptions): Q.Promise<number> {
		vsts.debug("Creating site...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("add site");
		toolRunner.arg("/name:" + options.name);
		toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
		toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');

		return toolRunner.exec();
	}

	public remove(name: string): Q.Promise<number> {
		vsts.debug("Deleting site...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("delete site");
		toolRunner.arg("/site.name:" + name);

		return toolRunner.exec();
	}

	public start(name: string): Q.Promise<number> {
		vsts.debug("Starting site...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("start site");
		toolRunner.arg("/site.name:" + name);

		return toolRunner.exec();
	}

	public stop(name: string): Q.Promise<number> {
		vsts.debug("Stopping site...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("stop site");
		toolRunner.arg("/site.name:" + name);

		return toolRunner.exec();
	}

	public exists(name: string): Q.Promise<boolean> {
		vsts.debug("Checking if site exists...");

		var toolRunner = AppCmd.createAppCmdToolRunner();
		toolRunner.arg("list site");
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

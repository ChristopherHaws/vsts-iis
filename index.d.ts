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
    private toolRunner;
    private appCmdPath;
    constructor();
    createSiteSync(options: Site): toolRunner.IExecResult;
    deleteSiteSync(name: string): toolRunner.IExecResult;
    startSiteSync(name: string): toolRunner.IExecResult;
    stopSiteSync(name: string): toolRunner.IExecResult;
}

import * as toolRunner from "vsts-task-lib/toolrunner";
export interface SiteOptions {
    name: string;
    protocol: string;
    host: string;
    port: number;
    bindings?: string;
    path?: string;
}
export declare class AppPoolManager {
    addSync(options: SiteOptions): toolRunner.IExecResult;
    removeSync(name: string): toolRunner.IExecResult;
    startSync(name: string): toolRunner.IExecResult;
    stopSync(name: string): toolRunner.IExecResult;
    setIdentitySync(name: string, identity: string): toolRunner.IExecResult;
    existsSync(name: string): boolean;
}

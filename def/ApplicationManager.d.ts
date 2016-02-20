import * as toolRunner from "vsts-task-lib/toolrunner";
export interface ApplicationOptions {
    siteName: string;
    virtualPath: string;
    physicalPath: string;
}
export declare class ApplicationManager {
    addSync(options: ApplicationOptions): toolRunner.IExecResult;
    setAppPoolSync(appName: string, appPoolName: string): toolRunner.IExecResult;
    setWindowsAuthenticationSync(appPath: string, enable: boolean): toolRunner.IExecResult;
    setAnonymousAuthenticationSync(appPath: string, enable: boolean): toolRunner.IExecResult;
    existsSync(name: string): boolean;
}

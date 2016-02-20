import {SiteManager} from "./SiteManager"
import {AppPoolManager} from "./AppPoolManager"
import {ApplicationManager} from "./ApplicationManager"

export var Sites = new SiteManager();
export var AppPools = new AppPoolManager();
export var Applications = new ApplicationManager();
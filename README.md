# vsts-iis

Node IIS AppCmd wrapper for building tasks for Visual Studio Team Services.

## Install

	npm install --save vsts-iis

## Create a new site
```
iis.Sites.add({
	name: 'Default Web Site',
	protocol: 'http',
	port: 80,
	host: '*',
	path : 'C:/inetpub/wwwroot'
}).then(function() {
	console.log("Success");
});;
```

## Remove a site
```
iis.Sites.remove('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Start a site
```
iis.Sites.start('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Stop a site
```
iis.Sites.stop('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Check if a site exists
```
iis.Sites.exists('Default Web Site')
	.then(function(exists) {
		if (exists) {
			console.log("Site exists!");
		} else {
			console.log("Site does not exist!");
		}
	});
```

## Create a new app pool
```
iis.AppPools.add('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Remove an app pool
```
iis.AppPools.remove('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Start an app pool
```
iis.AppPools.start('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Stop an app pool
```
iis.AppPools.stop('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Recycle an app pool
```
iis.AppPools.recycle('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Set the identity an app pool
```
iis.AppPools.setIdentity('DefaultAppPool', 'ApplicationPoolIdentity')
	.then(function() {
		console.log("Success");
	});
```

## Check if an app pool exists
```
iis.AppPools.exists('DefaultAppPool')
	.then(function(exists) {
		if (exists) {
			console.log("AppPool exists!");
		} else {
			console.log("AppPool does not exist!");
		}
	});
```

## Create a application
```
iis.Applications.add({
	name: 'MyApplication',
	virtualPath: '/',
	physicalPath : 'C:/inetpub/wwwroot/MyApplication'
}).then(function() {
	console.log("Success");
});;
```

## Set the app pool of an application
```
iis.Applications.setAppPool('MyApplication', 'DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Configure an application to use windows authentication
```
iis.Applications.setWindowsAuthentication('MyApplication', true)
	.then(function() {
		console.log("Success");
	});
```

## Configure an application to use anonymous authentication
```
iis.Applications.setAnonymousAuthentication('MyApplication', true)
	.then(function() {
		console.log("Success");
	});
```

## Check if an application exists
```
iis.Applications.exists('MyApplication')
	.then(function(exists) {
		if (exists) {
			console.log("Application exists!");
		} else {
			console.log("Application does not exist!");
		}
	});
```

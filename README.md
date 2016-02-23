# vsts-iis

Node IIS AppCmd wrapper for building tasks for Visual Studio Team Services.

## Install

	npm install --save vsts-iis

## Create a new site

	var iis = require('vsts-iis');

	iis.Sites.add({
		name: 'Default Web Site',
		protocol: 'http',
		port: 80,
		host: '\*',
		path : 'C:/inetpub/wwwroot'
	});

## Remove a site

	var iis = require('vsts-iis');

	iis.Sites.remove('Default Web Site')
		.then(function() {
			console.log("Success");
		});

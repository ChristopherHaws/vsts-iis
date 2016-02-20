var gulp = require("gulp");
var npm = require("gulp-install");
var typescript = require("gulp-typescript");
var debug = require("gulp-debug");
var concat = require("gulp-concat");
var merge = require("merge2");
var del = require("del");

var project = typescript.createProject("tsconfig.json", {
	noExternalResolve: true,
	sortOutput: true
});

gulp.task("clean", function(callback) {
	return del([
		"dist",
		"dist"
	]);
});

gulp.task("build", ["clean"], function (callback) {
	var tsResult = gulp
		.src([
			"./typings/**/*.d.ts",
			"./src/**/*.ts"
		])
		.pipe(typescript(project));

	// return merge([
	//     tsResult.dts.pipe(concat("index.d.ts")).pipe(gulp.dest(".")),
	//     tsResult.js.pipe(concat("index.js")).pipe(gulp.dest("."))
	// ]);
	return merge([
		tsResult.dts.pipe(gulp.dest("./dist")),
		tsResult.js.pipe(gulp.dest("./dist"))
	]);
});

gulp.task("default", ["build"]);

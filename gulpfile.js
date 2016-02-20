var gulp = require('gulp');
var typescript = require('gulp-typescript');
var debug = require('gulp-debug');
var merge = require('merge2');
var concat = require('gulp-concat');

var project = typescript.createProject("tsconfig.json", {
	noExternalResolve: true,
	sortOutput: true
});

gulp.task('typescript', function (callback) {
    var tsResult = gulp
		.src([
            './typings/**/*.d.ts',
            './src/**/*.ts'
        ])
        .pipe(typescript(project));
		
	return merge([
        tsResult.dts.pipe(concat("vsts-iis.d.ts")).pipe(gulp.dest('.')),
        tsResult.js.pipe(concat("vsts-iis.js")).pipe(gulp.dest('.'))
    ]);
});

gulp.task('default', ['typescript']);
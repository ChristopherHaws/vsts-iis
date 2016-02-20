var gulp = require('gulp');
var typescript = require('gulp-typescript');
var debug = require('gulp-debug');
var merge = require('merge2');

var project = typescript.createProject("tsconfig.json", {
	noExternalResolve: true
});

gulp.task('typescript', function (callback) {
    var tsResult = gulp
		.src([
            './typings/**/*.d.ts',
            './src/**/*.ts'
        ])
        .pipe(typescript(project));
		
	return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest('./lib'))
    ]);
});

gulp.task('default', ['typescript']);
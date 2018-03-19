var gulp = require('gulp');
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

gulp.task('less', function() {
	var processors = [
		autoprefixer,
		cssnext,
		precss
	];
	
	gulp.watch('./src/layout.less',['less']);
	return gulp.src('./src/*.less').pipe(less()).pipe(postcss(processors)).pipe(gulp.dest('dist/css'));
});
/*
|--------------------------------------------------------------------------
| GULP TASKS FOR CSS
|--------------------------------------------------------------------------
|
| This file contains the Gulp tasks related to CSS and SCSS
|
*/

const gulp         = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');

const conf = require('../gulpconfig');

// Task for prefixing and compiling SCSS to CSS
gulp.task('css', ['css:vendor'], function() {
  return gulp.src([conf.path.src.scss + '/**/*.{scss,sass}'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(conf.path.dest.css));
});

// Moves npm dependencie and custom vendor scripts to the vender script destination location
gulp.task('css:vendor', function() {
  gulp.src('node_modules/animate.css/animate.min.css')
    .pipe(gulp.dest(conf.path.dest.css));
});

// Task used to compile SCSS and update CSS in browserSync 
gulp.task('css:watch', ['css'], function() {
  return global.browserSync.reload('*.css');
});
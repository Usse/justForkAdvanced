var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('browserify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
    htmlhint = require("gulp-htmlhint"), 
    jshint = require('gulp-jshint');


gulp.task('clean', function() {
 return gulp.src('./dist/')
 .pipe(clean());
});

gulp.task('templates', function() {
  gulp.src(['./src/templates/!(_)*.jade'])
    .pipe(plumber())
    .pipe(jade({'pretty' : true}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return sass('./src/css/screen.scss', { style: 'expanded' })
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return browserify('./src/js/scripts.js')
    .bundle()
    .pipe(plumber())
    .pipe(source('scripts.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('connect', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    browser: "google chrome",
    notify : false
  });
});

gulp.task('jshint', function() {
  gulp.src(['./src/js/**/*.js', '!./src/js/libs/jquery.js', '!./src/js/libs/utils.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('htmlhint',function() {
  return gulp.src('./dist/*.html')
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter('jshint-stylish'));
});






/*********************************************************/

gulp.task('default', ['clean'], function() {
  console.log('TODO : write usage');
});

gulp.task('copy', function() {
  gulp.src('./src/js/libs/*.js').pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('watch', function() {
  gulp.watch('./src/templates/**/*.jade', ['templates', 'htmlhint']);
  gulp.watch('./src/js/**/*.js', ['scripts', 'jshint']);
  gulp.watch(['./src/css/*/*/*/*.scss', './src/css/*/*/*.scss', './src/css/*/*.scss','./src/css/*.scss'],['styles']);
});

gulp.task('dev', function() {
  runSequence('clean', ['copy'], ['templates', 'styles', 'scripts', 'connect'], ['templates', 'htmlhint'], ['watch']);
});















var gulp = require('gulp'),                           //
    
/*
    
    
    jshint = require('gulp-jshint'),
    htmlhint = require("gulp-htmlhint"),
    
    
*/
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
    source = require('vinyl-source-stream');


var paths = {
      scripts: ['src/js/**/*.js'],
      styles: ['src/css/**/*.scss'],
      html: ['src/templates/**/*.jade'], 
      src: ['./src/'],
      dist: ['./dist/']
};





gulp.task('clean', function() {
 return gulp.src(paths.dist)
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

gulp.task('connect', function() {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      browser: "google chrome",
      notify : false
  });
});


gulp.task('scripts', function() {
    return browserify('./src/js/scripts.js')
        .bundle()
        .pipe(plumber())
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('scripts.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
});





gulp.task('default', ['clean'], function() {
  console.log('DEFAULT!');
});


gulp.task('copy', function() {
  //gulp.src('src/css/').pipe(gulp.dest('dist'));
  gulp.src('./src/js/libs/*.js').pipe(gulp.dest('./dist/js/libs'));
  //gulp.src('src/templates/').pipe(gulp.dest('dist'));
});




gulp.task('watch', function() {
  gulp.watch('./src/templates/**/*.jade', ['templates']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch(['./src/css/*/*/*/*.scss', './src/css/*/*/*.scss', './src/css/*/*.scss','./src/css/*.scss'],['styles']);
});





gulp.task('dev', function() {
  runSequence('clean', ['copy'], ['templates', 'styles', 'scripts', 'connect'], ['watch']);
});















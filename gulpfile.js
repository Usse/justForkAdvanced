var gulp          = require('gulp'),
    chalk         = require('chalk'),
    concat        = require('gulp-concat'),
    browserify    = require('browserify'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    connect       = require('gulp-connect'),
    plumber       = require('gulp-plumber'),
    clean         = require('gulp-clean'),
    jade          = require('gulp-jade'),
    runSequence   = require('run-sequence'),
    browserSync   = require('browser-sync').create(),
    source        = require('vinyl-source-stream'),
    htmlhint      = require("gulp-htmlhint"), 
    jshint        = require('gulp-jshint'),
    minifyCss     = require('gulp-minify-css'),
    jscs          = require('gulp-jscs'),
    jasmine       = require('gulp-jasmine'),
    scsslint      = require('gulp-scss-lint');

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
    .pipe(minifyCss({compatibility: 'ie8'}))
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

gulp.task('jshint-jscs', function() {
  gulp.src(['./src/js/**/*.js', '!./src/js/libs/**/*.js'])
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs());
});

gulp.task('htmlhint',function() {
  return gulp.src('./dist/*.html')
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter('jshint-stylish'));
});

gulp.task('scss-lint', function() {
  gulp.src(['./src/css/screen.scss', './src/css/**/**/*.scss','!./src/css/libs/**/*.scss'])
    .pipe(plumber())
    .pipe(scsslint({
      'endless' : true,
      'config': 'lint.yml'
    }));
});

gulp.task('jasmine', function () {
  return gulp.src('./tests/jasmine/spec/SumSpec.js')
    .pipe(plumber())
    .pipe(jasmine());
});




/*********************************************************/

gulp.task('default', function() {
  console.log('');
  console.log(chalk.blue('justForkAdvanced'));
  console.log(chalk.blue('usage :'));
  console.log(chalk.blue('  $> gulp dev        -> start dev server'));
  console.log(chalk.blue('  $> gulp build      -> build dist folder'));
  console.log(chalk.blue('  $> gulp cleanDist  -> clean dist folder'));
  console.log('');

});



//Private

gulp.task('copy', function() {
  gulp.src('./src/js/libs/*.js').pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('watch', function() {
  gulp.watch('./src/templates/**/*.jade', ['templates', 'htmlhint']);
  gulp.watch('./src/js/**/*.js', ['scripts', 'jshint-jscs', 'jasmine']);
  gulp.watch(['./src/css/**/**/**/**.scss', './src/css/*/*/*.scss', './src/css/*/*.scss','./src/css/*.scss'],['styles']);
  gulp.watch(['./src/css/**/**/*.scss','!./src/css/libs/**/*.scss'],['scss-lint']);
});



//Public

gulp.task('dev', function() {
  runSequence('clean', ['copy'], ['templates', 'styles', 'scripts'], ['templates', 'htmlhint', 'jshint-jscs', 'scss-lint'], ['watch', 'connect']);
});

gulp.task('build', function() {
  runSequence('clean', ['copy'], ['templates', 'styles', 'scripts'], ['templates', 'htmlhint', 'jshint-jscs', 'scss-lint'],['jasmine']);
});

gulp.task('cleanDist', function() {
  runSequence('clean');
});















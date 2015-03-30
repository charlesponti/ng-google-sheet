'use strict';

// Development versions are default
global.isProd = false;

// Current working directory
var cwd = process.cwd();

// Gulp & Plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Styles
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// Scripts
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var superstatic = require('superstatic');
var runSequence = require('run-sequence');

/**
 * If gulp tasks should be run in production mode
 * @type {boolean}
 */
var isProd = require('yargs').argv.prod;

var files = {
  scripts: {
    main: './src/scripts/main.js',
    source: 'src/scripts/**/*.js',
    build: 'build/scripts'
  },
  styles: {
    main: './src/styles/main.scss',
    source: 'src/styles/**/*.scss',
    build: 'build/styles'
  },
  html: {
    source: 'src/**/*.html',
    build: 'build/'
  }
};

gulp.task('scripts', function() {
  return browserify({
      entries: [files.scripts.main],
      debug: !isProd,
      insertGlobals: true,
      transform: babelify
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe($.if(isProd, $.streamify($.uglify())))
    .pipe(gulp.dest(files.scripts.build));
});

gulp.task('styles', function() {
  return gulp.src(files.styles.main)
    .pipe(sass({
      sourceComments: isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: isProd ? 'compressed' : 'nested'
    }))
    .pipe($.if(isProd, $.minifyCss()))
    .pipe(gulp.dest(files.styles.build));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
      .pipe(gulp.dest(files.html.build));
});

gulp.task('watch', function() {
  gulp.watch(files.html.source, ['html']);
  gulp.watch(files.scripts.source, ['scripts']);
  return gulp.watch(files.styles.source, ['styles']);
});

gulp.task('server', function() {
  superstatic({
    logger: {
      info: function(msg) {
        console.log('Info:', msg);
      },
      error: function(msg) {
        console.error('Error:', msg);
      }
    },
    port: 3000,
    config: 'divshot.json'
  })
  .listen(function() {
    console.log('Server running on port ' + 3000);
  });
});

gulp.task('vendor', function() {
  var stream = gulp.src([
    'bower_components/accounting/accounting.js',
    'bower_components/money/money.js',
    'bower_components/lodash/lodash.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/js/bootstrap.js'
  ]);

  stream
      .pipe(gulp.dest('build/vendor'));

  return stream;
});

gulp.task('build', function() {
  return runSequence('html', 'styles', 'scripts');
});

gulp.task('default', function() {
  return runSequence(['build'], 'watch', 'server');
});

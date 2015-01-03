'use strict';

// Development versions are default
global.isProd = false;

// Current working directory
var cwd = process.cwd();

var runSequence = require('run-sequence');

// Gulp & Plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var gulpif = $.if;
var concat = $.concat;
var uglify = $.uglify;
var streamify = $.streamify;
var minifyHTML = $.minifyHtml;
var templateCache = $.angularTemplatecache;

// Styles
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// Scripts
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var ngannotate = require('browserify-ngannotate');

// Testing
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

// Dev Server
var superstatic = require('superstatic');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

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

gulp.task('jshint', function() {
  return gulp.src(files.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['jshint'], function() {
  return browserify({
      entries: [files.scripts.main],
      debug: global.isProd ? false : true,
      insertGlobals: true,
      transform: ngannotate
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulpif(global.isProd, streamify(uglify())))
    .pipe(gulp.dest(files.scripts.build));
});

gulp.task('styles', function() {
  return gulp.src(files.styles.main)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(gulpif(global.isProd, minifycss()))
    .pipe(gulp.dest(files.styles.build));
});

gulp.task('views', function() {
  gulp.src('src/index.html')
      .pipe(minifyHTML({
        comments: global.isProd ? false : true,
        spare: global.isProd ? false : true,
        empty: true
      }))
      .pipe(gulp.dest(files.html.build));

  return gulp.src('./src/views/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('./src/scripts'));
});

gulp.task('test', function(done) {
  return karma.server.start({
    configFile: cwd + '/karma.conf.js'
  }, done);
});

gulp.task('protractor', ['webdriver-update', 'webdriver' ], function() {
  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
        configFile: './test/protractor.conf.js',
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('watch', function() {
  gulp.watch(files.html.source, ['views']);
  gulp.watch(files.scripts.source, ['scripts']);
  return gulp.watch(files.styles.source, ['styles']);
});

gulp.task('server', function(next) {
  var server = superstatic({
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
  });
  server.listen(function() {
    console.log('Server running on port ' + server.port);
  });
  return next();
});

gulp.task('prod', function() {
  global.isProd = true;
  return runSequence('views', 'styles', 'scripts');
});

gulp.task('build', function() {
  return runSequence('views', 'styles', 'scripts');
});

gulp.task('default', function() {
  return runSequence('build', 'watch', 'server');
});

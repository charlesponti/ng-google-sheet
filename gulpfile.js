'use strict';

var gulp = require('gulp');
var karma = require('karma');
var stylish = require('jshint-stylish');
var minifyHTML = require('gulp-minify-html');

// Gulp Plugins
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');

// Browserify Dependencies
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ngAnnotate = require('browserify-ngannotate');

// Protractor
var protractor      = require('gulp-protractor').protractor;
var webdriver       = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

var templateCache  = require('gulp-angular-templatecache');

// Dev Server
var port = 4000;
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var files = {
  scripts: {
    main: './src/scripts/main.js',
    source: './src/scripts/**/*.js',
    build: './build/scripts'
  },
  styles: {
    main: './src/styles/main.scss',
    source: './src/styles/**/*.scss',
    build: './build/styles'
  },
  html: {
    source: './src/**/*.html',
    build: './build/'
  }
};

gulp.task('jshint', function() {
  return gulp.src(files.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('build-scripts', ['jshint'], function() {
  return browserify({
      entries: [files.scripts.main],
      insertGlobals: true,
      debug: true,
      cache: {},
      packageCache: {},
      transform: ngAnnotate
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(files.scripts.build))
    .pipe(reload({ stream: true }));
});

gulp.task('build-scripts-prod', function() {
  return browserify({
      entries: [files.scripts.main],
      insertGlobals: true,
      debug: false,
      cache: {},
      packageCache: {},
      transform: ngAnnotate
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(files.scripts.build));
});

gulp.task('build-styles', function() {
  return gulp.src(files.styles.main)
    .pipe(sass())
    .pipe(gulp.dest(files.styles.build))
    .pipe(reload({ stream: true }));
});

gulp.task('build-styles-prod', function() {
  return gulp.src(files.styles.main)
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(files.styles.build));
});

gulp.task('build-html', function() {
  gulp.src('./src/views/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('./src/scripts'));

  return gulp.src(files.html.source)
    .pipe(minifyHTML({
      comments: true,
      spare: true,
      empty: true
    }))
    .pipe(gulp.dest(files.html.build))
    .pipe(reload({ stream: true }));
});

gulp.task('test', function(done) {
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('protractor', ['webdriver-update', 'webdriver' ], function() {

  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
        configFile: './protractor.conf.js',
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });

});

gulp.task('server', function() {
  return browserSync({
    files: [
    './build/scripts/**/*.js',
    './build/styles/**/*.css',
    './build/**/*.html'
    ],
    server: {
      baseDir: './build',
      middleware: [historyApiFallback]
    },
    port: port
  });
});

gulp.task('build', ['build-styles', 'build-scripts', 'build-html']);

gulp.task('prod-build', [
  'build-html',
  'build-styles-prod',
  'build-scripts-prod'
]);

gulp.task('default', [ 'build', 'server' ], function() {

  watch({ glob: files.styles.source }, function() {
    return gulp.start('build-styles');
  });

  watch({ glob: files.html.source }, function() {
    return gulp.start('build-html');
  });

  return watch({ glob: files.scripts.source }, function() {
    return gulp.start('build-scripts');
  });

});

'use strict';

module.exports = function(config) {
  config.set({

    browsers: [
      'Chrome',
      // Have commented out `Firefox` as there is currently an issue with the
      // Firefox throwing an error: https://github.com/karma-runner/karma/pull/1098
      // 'Firefox'
    ],

    frameworks: [
      'browserify',
      'jasmine'
    ],

    files: [
      // App file
      '../src/scripts/main.js',
      // libraries
      '../node_modules/angular-mocks/angular-mocks.js',
      // Tests
      './unit/**/*.js'
    ],

    preprocessors: {
      // Use Browserify for Test files
      './unit/**/*.js': ['browserify'],
      // Use Browserify for app files
      '../src/scripts/**/*.js': ['browserify']
    },

    browserify: {
      debug: true
    },

    plugins: [
      'karma-bro',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]

  });
};

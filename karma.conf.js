'use strict';

module.exports = function(config) {
  config.set({

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'jasmine'
    ],

    files: [
      // libraries
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      // App file
      'src/scripts/main.js',
      // Tests
      'test/unit/**/*spec.js'
    ],

    preprocessors: {
      // Use Browserify for Test files
      'test/unit/**/*spec.js': 'browserify',
      // Use Browserify for app files
      'src/scripts/**/*.js': 'browserify'
    },

    browserify: {
      debug: true,
      extensions: ['.js']
    },

    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-chrome-launcher'
    ]

  });
};

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
      // App file
      'src/scripts/main.js',
      // libraries
      'node_modules/angular-mocks/angular-mocks.js',
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

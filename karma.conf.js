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
      'src/scripts/main.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/**/*spec.js'
    ],

    preprocessors: {
      'test/**/*spec.js': ['browserify'],
      'src/scripts/**/*.js': ['browserify']
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

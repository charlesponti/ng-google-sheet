'use strict';

exports.config = {

  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:4000/',

  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    'test/e2e/**/*.js'
  ]

};

'use strict';

module.exports = angular.module('ngGoogleSheet', [])
  .constant('Constants', require('./constants'))
  .service('GoogleSheets', require('./google-sheets'))
  .directive('ngGoogleSheet', require('./directive'));

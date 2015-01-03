'use strict';

module.exports = angular.module('ngGoogleSheet', [])
  .constant('Constants', require('./constants'))
  .service('GoogleSheets', require('./google-sheets'))
  .directive('gridRow', require('./row'))
  .directive('ngGoogleSheet', require('./directive'));

'use strict';

window.$ =
window.jQuery = require('jquery');

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular');
require('angular-route');
require('../../node_modules/ng-grid/build/ng-grid');

// Request Application dependencies
require('./templates');
require('./services');
require('./directives');
require('./controllers');

// Declare module and configure
angular.module('trDatagrid', [
    'ngRoute',
    'ngGrid',
    'templates',
    'trDatagrid.services',
    'trDatagrid.directives',
    'trDatagrid.controllers'
  ])
  .config(require('./config'))
  .constant('Constants', require('./constants'));

angular.bootstrap(document, ['trDatagrid']);

'use strict';

window.$ =
window.jQuery = require('jquery');

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular');
require('angular-route');
require('angular-resource');
require('../../node_modules/ng-grid/build/ng-grid');

// Request Application dependencies
require('./services');
require('./controllers');

// Require routes
var routes = require('./routes');

// Declare module and configure
angular.module('trDatagrid', [
    'ngRoute',
    'ngResource',
    'ngGrid',
    'trDatagrid.services',
    'trDatagrid.controllers'
  ])
  .config(routes);

angular.bootstrap(document, ['trDatagrid']);

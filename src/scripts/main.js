'use strict';

window.$ =
window.jQuery = require('jquery');

window._ = require('lodash');

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular');
require('angular-route');

// Request Application dependencies
require('./templates');
require('./datagrid');
require('./controllers');

// Declare module and configure
angular.module('app', [
    'ngRoute',
    'templates',
    'ngGoogleSheet',
    'app.controllers'
  ])
  .config(require('./config'));

angular.bootstrap(document, ['app']);

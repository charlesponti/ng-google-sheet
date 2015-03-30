'use strict';

// Request Application dependencies
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

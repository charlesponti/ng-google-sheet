'use strict';

window.jQuery = require('jquery');

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular');
require('angular-route');
require('angular-resource');

// Require routes
var routes = require('./routes');

// Declare module and configure
angular.module('myApp', ['ngRoute', 'ngResource'])
  .config(routes)
  .controller('HomeCtrl', require('./controllers/home'))
  .controller('AboutCtrl', require('./controllers/about'));

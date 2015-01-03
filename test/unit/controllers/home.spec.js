describe('Controllers: HomeCtrl', function() {
  'use strict';

  var ctrl;

  beforeEach(function() {
    angular.mock.module('app');

    angular.mock.inject(function($controller) {
      ctrl = $controller('HomeCtrl');
    });
  });

  afterEach(function() {
    ctrl = undefined;
  });

});

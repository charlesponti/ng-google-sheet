describe('Controllers: HomeCtrl', function() {
  'use strict';

  var $scope;

  beforeEach(function() {
    angular.mock.module('trDatagrid');

    angular.mock.inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('HomeCtrl', {
        $scope: $scope
      });
    });
  });

  afterEach(function() {
    $scope = undefined;
  });

  describe('.title', function() {
    it('should have correct value', function() {
      expect($scope.title).toEqual("Welcome to Facade-Angular");
    });
  });

});

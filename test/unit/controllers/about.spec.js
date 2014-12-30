describe('Controllers: AboutCtrl', function() {
  'use strict';

  var $scope;

  beforeEach(function() {
    // Inject module
    angular.mock.module('myApp');

    // Mock controller
    angular.mock.inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller('AboutCtrl', {
        $scope: $scope
      });
    });
  });

  afterEach(function() {
    $scope = undefined;
  });

  describe('.title', function() {
    it('should have correct value', function() {
      expect($scope.title).toEqual("All About Facade-Angular");
    });
  });

  describe('.body', function() {
    it('should have correct value', function() {
      expect($scope.body)
        .toEqual("This is a boilerplate for building an Angular application");
    });
  });

});

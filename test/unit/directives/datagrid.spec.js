describe('Unit: Directives/datagrid', function() {
  'use strict';

  var scope, element, $compile, $rootScope;

  beforeEach(function(done) {
    angular.mock.module('trDatagrid');

    angular.mock.inject(function($compile, $rootScope, $q, GoogleSheets){
      spyOn(GoogleSheets, 'get').and.returnValue($q.defer().promise);

      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope.$new();
      // compile element
      element = $compile("<trdatagrid></trdatagrid>")(scope);
      // fire all the watches, so the scope expressions will be evaluated
      scope.$digest();
      done();
    });
  });

  afterEach(function() {
    element =
    $compile =
    $rootScope = undefined;
  });

  describe('.rows', function() {
    it('should be defined', function() {
      expect(scope.rows).toEqual([]);
    });
  });

  describe('.onGetSuccess()', function() {
    var data = {
      title: 'Datagrid',
      headers: ['ticker','industry','marketcap'],
      rows: [
        { ticker: 'C', industry: 'Banking' },
        { ticker: 'JPM', industry: 'Banking' }
      ]
    };
    it('should set $scope.title', function() {
      scope.onGetSuccess(data);
      expect(scope.title).toEqual(data.title);
    });
    it('should set $scope.headers', function() {
      scope.onGetSuccess(data);
      expect(scope.headers).toEqual(data.headers);
    });
    it('should set $scope.rows', function() {
      scope.onGetSuccess(data);
      expect(scope.rows).toEqual(data.rows);
    });
  });

});

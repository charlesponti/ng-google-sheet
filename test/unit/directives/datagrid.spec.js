describe('Unit: Directives/datagrid', function() {
  'use strict';

  var $ = require('jquery');
  var scope, element, $compile, $rootScope;

  beforeEach(function(done) {
    angular.mock.module('trDatagrid');

    // Create element
    element = angular.element("<trdatagrid></trdatagrid>");

    angular.mock.inject(function($compile, $rootScope, $q, GoogleSheets){
      spyOn(GoogleSheets, 'get').and.returnValue($q.defer().promise);
      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope;
      // Compile element
      $compile(element)(scope);
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

  describe('.fx', function() {
    it('should be defined', function() {
      expect(typeof scope.fx).toEqual('function');
    });
  });

  describe('.formatNumber', function() {
    it('should be defined', function() {
      expect(typeof scope.formatNumber).toEqual('function');
    });
  });

  describe('.rows', function() {
    it('should be defined', function() {
      expect(scope.rows).toEqual([]);
    });
  });

  describe('.currentColumnHover', function() {
    it('should be defined', function() {
      expect(scope.currentColumnHover).toEqual('');
    });
  });

  describe('.currentSort', function() {
    it('should be defined', function() {
      expect(scope.currentSort.key).toEqual(undefined);
      expect(scope.currentSort.direction).toEqual(undefined);
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
    it('should set $scope.rows', function() {
      scope.onGetSuccess(data);
      expect(scope.rows).toEqual(data.rows);
    });
  });

  describe('.sortAsc()', function() {
    it('should sort the rows in ascending order', function() {
      scope.rows = [
        { num: 5 },
        { num: 10 },
        { num: 1 },
        { num: 7 }
      ];
      scope.sortAsc('num');
      expect(scope.rows).toEqual([
        { num: 1 },
        { num: 5 },
        { num: 7 },
        { num: 10 }
      ]);
      expect(scope.currentSort.direction).toEqual('up');
    });
  });

  describe('.sortDesc()', function() {
    it('should sort the rows in ascending order', function() {
      scope.rows = [
        { num: 5 },
        { num: 10 },
        { num: 1 },
        { num: 7 }
      ];
      scope.sortDesc('num');
      expect(scope.rows).toEqual([
        { num: 10 },
        { num: 7 },
        { num: 5 },
        { num: 1 }
      ]);
      expect(scope.currentSort.direction).toEqual('down');
    });
  });

  describe('.onHeaderClick()', function() {
    var event;
    beforeEach(function() {
      spyOn($.fn, 'html');
      spyOn($.fn, 'addClass');
      spyOn(scope, 'sortAsc');
      spyOn(scope, 'sortDesc');
      event = { target: { addClass: function() {} } };
    });
    it('should call $scope.sortAsc', function() {
      scope.onHeaderClick('num', event);
      expect(scope.sortAsc).toHaveBeenCalledWith('num');
      expect($.fn.addClass).toHaveBeenCalledWith('highlight');
    });
    it('should set $scope.currentSort.key', function() {
      scope.onHeaderClick('num', event);
      expect(scope.currentSort.key).toEqual('num');
    });
    it('should call $scope.sortAsc if same key', function() {
      scope.currentSort.key = 'num';
      scope.onHeaderClick('num', event);
      expect(scope.sortAsc).toHaveBeenCalledWith('num');
      expect($.fn.html).toHaveBeenCalledWith(scope.arrows.up);
    });
    it('should call $scope.sortAsc if same key and down', function() {
      scope.currentSort.key = 'num';
      scope.currentSort.direction = 'down';
      scope.onHeaderClick('num', event);
      expect(scope.sortAsc).toHaveBeenCalledWith('num');
      expect($.fn.html).toHaveBeenCalledWith(scope.arrows.up);
    });
    it('should call $scope.sortDesc if same key and up', function() {
      scope.currentSort.key = 'num';
      scope.currentSort.direction = 'up';
      scope.onHeaderClick('num', event);
      expect(scope.sortDesc).toHaveBeenCalledWith('num');
      expect($.fn.html).toHaveBeenCalledWith(scope.arrows.down);
    });
  });

  describe('.formatMoney()', function() {
    it('should format money correctly', function() {
      expect(scope.formatMoney(1000)).toEqual('£ 1,000.00');
    });
  });

  describe('.onCellHover', function() {
    it('should remove and add hover class', function() {
      scope.onCellHover('foo');
      expect(scope.currentColumnHover).toEqual('foo');
    });
  });

});

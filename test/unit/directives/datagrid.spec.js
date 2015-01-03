describe('Module: datagrid', function() {
  'use strict';

  var $ = require('jquery');
  var ctrl, scope, element, $compile, $rootScope;

  beforeEach(function(done) {
    // Mock `datagrid` module
    angular.mock.module('ngGoogleSheet');

    // Create element
    element = angular.element('<ng-google-sheet key="fooKey"></ng-google-sheet>');

    angular.mock.inject(function($compile, $rootScope, $q, GoogleSheets, $controller){
      // Spy on GoogleSheets.get so as to not make actual API requests
      spyOn(GoogleSheets, 'get').and.returnValue($q.defer().promise);
      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope;
      // Compile element
      $compile(element)(scope);
      // fire all the watches, so the scope expressions will be evaluated
      scope.$digest();
      // Create controller
      ctrl = $controller(require('../../../src/scripts/datagrid/controller'), {
        $scope: $rootScope.$new(),
        GoogleSheets: GoogleSheets,
        $attrs: { key: 'fooKey' },
        $element: element
      });
      done();
    });
  });

  afterEach(function() {
    ctrl =
    scope =
    element =
    $compile =
    $rootScope = undefined;
  });

  describe('DatagridController', function() {
    describe('.fx', function() {
      it('should be defined', function() {
        expect(typeof ctrl.fx).toEqual('function');
      });
    });

    describe('.formatNumber', function() {
      it('should be defined', function() {
        expect(typeof ctrl.formatNumber).toEqual('function');
      });
    });

    describe('.rows', function() {
      it('should be defined', function() {
        expect(ctrl.rows).toEqual([]);
      });
    });

    describe('.currentColumnHover', function() {
      it('should be defined', function() {
        expect(ctrl.currentColumnHover).toEqual('');
      });
    });

    describe('.currentSort', function() {
      it('should be defined', function() {
        expect(ctrl.currentSort.key).toEqual(undefined);
        expect(ctrl.currentSort.direction).toEqual(undefined);
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
        it('should set $ctrl.title', function() {
          ctrl.onGetSuccess(data);
          expect(ctrl.title).toEqual(data.title);
        });
        it('should set $ctrl.rows', function() {
          ctrl.onGetSuccess(data);
          expect(ctrl.rows).toEqual(data.rows);
        });
      });

    describe('.sortAsc()', function() {
      it('should sort the rows in ascending order', function() {
        ctrl.rows = [
          { num: 5 },
          { num: 10 },
          { num: 1 },
          { num: 7 }
        ];
        ctrl.sortAsc('num');
        expect(ctrl.rows).toEqual([
          { num: 1 },
          { num: 5 },
          { num: 7 },
          { num: 10 }
        ]);
        expect(ctrl.currentSort.direction).toEqual('up');
      });
    });

    describe('.sortDesc()', function() {
      it('should sort the rows in ascending order', function() {
        ctrl.rows = [
          { num: 5 },
          { num: 10 },
          { num: 1 },
          { num: 7 }
        ];
        ctrl.sortDesc('num');
        expect(ctrl.rows).toEqual([
          { num: 10 },
          { num: 7 },
          { num: 5 },
          { num: 1 }
        ]);
        expect(ctrl.currentSort.direction).toEqual('down');
      });
    });

    describe('.onHeaderClick()', function() {
      var event;
      beforeEach(function() {
        spyOn($.fn, 'html');
        spyOn($.fn, 'addClass');
        spyOn(ctrl, 'sortAsc');
        spyOn(ctrl, 'sortDesc');
        event = { target: { addClass: function() {} } };
      });
      it('should call $ctrl.sortAsc', function() {
        ctrl.onHeaderClick('num', event);
        expect(ctrl.sortAsc).toHaveBeenCalledWith('num');
        expect($.fn.addClass).toHaveBeenCalledWith('highlight');
      });
      it('should set $ctrl.currentSort.key', function() {
        ctrl.onHeaderClick('num', event);
        expect(ctrl.currentSort.key).toEqual('num');
      });
      it('should call $ctrl.sortAsc if same key', function() {
        ctrl.currentSort.key = 'num';
        ctrl.onHeaderClick('num', event);
        expect(ctrl.sortAsc).toHaveBeenCalledWith('num');
        expect($.fn.html).toHaveBeenCalledWith(ctrl.arrows.up);
      });
      it('should call $ctrl.sortAsc if same key and down', function() {
        ctrl.currentSort.key = 'num';
        ctrl.currentSort.direction = 'down';
        ctrl.onHeaderClick('num', event);
        expect(ctrl.sortAsc).toHaveBeenCalledWith('num');
        expect($.fn.html).toHaveBeenCalledWith(ctrl.arrows.up);
      });
      it('should call $ctrl.sortDesc if same key and up', function() {
        ctrl.currentSort.key = 'num';
        ctrl.currentSort.direction = 'up';
        ctrl.onHeaderClick('num', event);
        expect(ctrl.sortDesc).toHaveBeenCalledWith('num');
        expect($.fn.html).toHaveBeenCalledWith(ctrl.arrows.down);
      });
    });

    describe('.formatMoney()', function() {
      it('should format money correctly', function() {
        expect(ctrl.formatMoney(1000)).toEqual('£ 1,000.00');
      });
    });

    describe('.onCellHover', function() {
      it('should remove and add hover class', function() {
        ctrl.onCellHover('foo');
        expect(ctrl.currentColumnHover).toEqual('foo');
      });
    });
  });

});

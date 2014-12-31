'use strict';

var $ = require('jquery');
var _ = require('lodash');
var accounting = require('accounting');

module.exports = function($templateCache) {
  return {
    //  Restrict to <trdatagrid></trdatagrid> usage
    restrict: 'E',
    // Add pre-existing to ng-trasclude element within template
    transclude: true,
    replace: true,
    // Use template for directive
    template: $templateCache.get('datagrid.html'),
    // Controller for directive
    controller: function ($scope, $element, GoogleSheets) {
      $scope.fx = require('money');

      $scope.formatNumber = accounting.formatNumber;

      /**
       * Current column hovered over
       * @type {String}
       */
      $scope.currentColumnHover = '';

      $scope.grid = 'customGrid';

      $scope.arrows = {
        up: '&#65514;',
        down: '&#65516;'
      };

      /**
       * Array of stocks
       * **Example:**
       *  {
       *    ticker: 'CATS',
       *    industry: 'Meow',
       *    marketcap: 10000,
       *    price: 4000,
       *    change: 100,
       *    volume: 100000
       *  }
       * @type {Array}
       */
      $scope.rows = [];

      $scope.gridOptions = {
        data: 'rows',
        columnDefs: [
          {
            field: 'ticker',
            displayName: 'Ticker'
          },
          {
            field: 'industry',
            displayName: 'Industry'
          },
          {
            field: 'marketcap',
            displayName: 'Market Cap',
            cellTemplate: '<div class="ngCellText">{{formatMoney(row.getProperty(col.field))}}</div>'
          },
          {
            field: 'change',
            displayName: 'Change',
            cellTemplate: '<div ng-class="{red: (row.getProperty(col.field) < 0), green: (row.getProperty(col.field) > 0)}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'
          },
          {
            field: 'price',
            displayName: 'Price',
            cellTemplate: '<div class="ngCellText">{{formatMoney(row.getProperty(col.field))}}</div>'
          },
          {
            field: 'volume',
            displayName: 'Volume',
            cellTemplate: '<div class="ngCellText">{{formatNumber(row.getProperty(col.field))}}</div>'
          }
        ]
      };

      $scope.currentSort = {
        key: undefined,
        direction: undefined
      };

      $scope.formatMoney = function(value) {
        return accounting.formatMoney(value, { symbol: '£', format: '%s %v' });
      };

      /**
       * Handle success of Google Sheets API request
       * @param {Object} data
       */
      $scope.onGetSuccess = function(data) {
        $scope.title = data.title;
        $scope.rows = data.rows;
      };

      $scope.onGetFail = function(data) {
        return console.warn(data);
      };

      $scope.sortAsc = function(key) {
        $scope.currentSort.direction = 'up';
        $scope.rows = _.sortBy($scope.rows, key);
      };

      $scope.sortDesc = function(key) {
        $scope.currentSort.direction = 'down';
        $scope.rows = _.sortBy($scope.rows, key).reverse();
      };

      $scope.onHeaderClick = function(key, $event) {
        /**
         * Click event
         * @type {HTMLEvent}
         */
        var target = $($event.target);

        // Toggle .highlight
        $element.find('tr th, .arrow').removeClass('highlight');

        // Empty icons
        $element.find('.arrow').html('');

        // Add highlight class to header
        target.addClass('highlight');

        // Reset currentSort.direction if new key
        if ($scope.currentSort.key != key) {
          $scope.currentSort.direction = undefined;
        }

        // Set currentSort.key to key of clicked header
        $scope.currentSort.key = key;

        // Call sort function based on current direction
        switch($scope.currentSort.direction) {
          case 'up':
            target.find('.arrow').html($scope.arrows.down);
            $scope.sortDesc(key);
            break;
          case 'down':
            target.find('.arrow').html($scope.arrows.up);
            $scope.sortAsc(key);
            break;
          default:
            target.find('.arrow').html($scope.arrows.up);
            $scope.sortAsc(key);
        }

        return $scope;
      };

      $scope.onCellHover = function(key) {
        if ($scope.currentColumnHover != key) {
          $scope.currentColumnHover = key;
          $element.find('td').removeClass('hover');
        }
        $element.find('td[data-key='+key+']').addClass('hover');
      };

      GoogleSheets
        .get('1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c')
        .then($scope.onGetSuccess)
        .catch($scope.onGetFail);

      return $scope;
    }
  };
};

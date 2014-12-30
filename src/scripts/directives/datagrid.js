'use strict';

// Spreadsheet url
// https://docs.google.com/spreadsheets/d/1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c/pubhtml

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
    controller: function ($scope, GoogleSheets) {
      /**
       * Array of stocks
       * **Example:**
       *  {
       *    ticker: 'CATS',
       *    industry: 'Meow',
       *    marketCap: 10000,
       *    price: 4000,
       *    change: 100,
       *    volume: 100000
       *  }
       * @type {Array}
       */
      $scope.stocks = [];

      return $scope;
    }
  };
};

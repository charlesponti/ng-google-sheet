'use strict';

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
       *    marketcap: 10000,
       *    price: 4000,
       *    change: 100,
       *    volume: 100000
       *  }
       * @type {Array}
       */
      $scope.rows = [];

      $scope.gridOptions = { data: 'rows' };

      $scope.onGetSuccess = function(data) {
        $scope.title = data.title;
        $scope.headers = data.headers;
        $scope.rows = data.rows;
        $scope.gridOptions = { data: 'rows' };
      };

      $scope.onGetFail = function(data) {

      };

      GoogleSheets
        .get('1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c')
        .then($scope.onGetSuccess)
        .catch($scope.onGetFail);

      return $scope;
    }
  };
};

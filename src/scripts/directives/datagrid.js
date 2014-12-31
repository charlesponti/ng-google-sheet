'use strict';

/**
 * @ngInject
 */
module.exports = function($templateCache) {
  return {
    //  Restrict to <trdatagrid></trdatagrid> usage
    restrict: 'E',
    // Add pre-existing to ng-trasclude element within template
    transclude: true,
    replace: true,
    // Use template for directive
    template: $templateCache.get('datagrid.html'),
    // Controller
    controller: require('../controllers/datagrid')
  };
};

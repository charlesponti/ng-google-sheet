'use strict';

/**
 * @ngInject
 */
module.exports = function($templateCache) {
  return {
    /**
     * @desc Restrict to <datagrid></datagrid> usage
     * @type {String}
     */
    restrict: 'E',
    /**
     * Add pre-existing to ng-trasclude element within template
     * @type {Boolean}
     */
    transclude: true,

    replace: true,
    /**
     * @desc Declare scope for directive
     * @type {Object}
     */
    scope: {},
    /**
     * @desc Template to be used for directive
     * @type {String}
     */
    template: $templateCache.get('datagrid.html'),
    /**
     * @desc Controller for directive
     * @type {Function}
     */
    controller: require('./controller'),
    /**
     * @desc Variable by which controller is reference within template
     * @type {String}
     */
    controllerAs: 'vm'
  };
};

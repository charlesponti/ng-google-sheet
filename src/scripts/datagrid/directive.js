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
    scope: {
      /**
       * @desc This value will be the configuration of the grid
       * @type {String}
       */
      config: '=config'
    },

    /**
     * @desc Template to be used for directive
     * @type {String}
     */
    template: `
      <div class="datagrid">
        <table class="table-striped" ng-show='vm.rows.length' ng-mouseleave="vm.removeHighlight()">
            <thead>
                <tr>
                    <th ng-repeat="column in vm.columns">
                        <div ng-click="vm.onHeaderClick(column.field, $event)" >
                            {{ column.header }}
                            <span class="arrow"></span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat='row in vm.rows'>
                    <td ng-repeat="column in vm.columns"
                        ng-mouseover="vm.onCellHover(column.field)"
                        data-key="{{column.field}}"
                        ng-class="{{column.class || '' }}">
                        {{ vm.formatColumnValue(column.field, column, row) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 class="text-center" ng-show='!vm.rows.length'> Loading... </h3>
      </div>
    `,

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

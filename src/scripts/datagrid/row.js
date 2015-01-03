'use strict';

module.exports = function() {
  return {
    // Restrict to element use <grid-row></grid-row>
    restrict: 'E',

    scope: {
      parent: '=parent',
      columns: '=columns'
    },

    template: [
      '<td ng-repeat="column in parent.columns" ng-class="column.class" data-key="column.field">',
        'ng-mouseover="vm.onCellHover(column.field)"',
        '{{data[field]}}',
        // '{{ vm.formatColumnValue(column.field, column, row) }}',
      '</td>'
    ].join(' '),

    compile: function() {
      return {
        pre: function($scope, $elm, $attrs) {
          console.log();
        },
        post: function($scope, $elm, $attrs, controllers) {
          console.log(['post', $scope]);
        }
      };
    }
  };
};

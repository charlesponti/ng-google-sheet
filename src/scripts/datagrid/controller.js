'use strict';

function DatagridController($scope, $element, GoogleSheets) {

  /**
   * @desc Store reference to controller as 'vm', as per recommendation from
   * AngularJS team
   * @type {Object}
   */
  var vm = this;

  /**
   * @desc Reference to 'money' module
   * @type {Object}
   */
  vm.fx = require('money');

  /**
   * @desc The message to display when the vm.rows.length is 0
   * @type {String}
   */
  vm.message = 'Loading...';

  /**
   * @desc Reference to formatNumber funciton from 'accounting' module
   * @type {Function}
   */
  vm.formatNumber = accounting.formatNumber;

  /**
   * @desc Current column hovered over
   * @type {String}
   */
  vm.currentColumnHover = '';

  /**
   * @desc Arrow icons for table headers
   * @type {Object}
   */
  vm.arrows = {
    up: '&#65514;',
    down: '&#65516;'
  };

  /**
   * @desc Array of stocks
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
  vm.rows = [];

  /**
   * @desc The current sorting state of the element
   * @type {Object}
   */
  vm.currentSort = {
    key: undefined,
    direction: undefined
  };

  /**
   * @desc Format money from number to formatted string
   * @param {Number} value Currency value
   */
  vm.formatMoney = function(value) {
    return accounting.formatMoney(value, { symbol: '£', format: '%s %v' });
  };

  /**
   * @desc Handle success of Google Sheets API request
   * @param {Object} data
   */
  vm.onGetSuccess = function(data) {
    vm.title = data.title;
    vm.rows = data.rows;
  };

  vm.columns = $scope.config.columns || [];

  vm.getColumns = function(data) {
    if ($scope.config.columns) {
      return $scope.config.columns;
    }

    var cache = [];

    // Handle potential issues with the passed in value
    if (!data || typeof(data[0]) === 'undefined' || data[0] === undefined) {
      return [];
    }

    // Crate array with unique column names
    data.forEach(function(col) {
      return _.merge(cache, Object.keys(col));
    });

    // Return array of column names with falsy values removed
    vm.columns = _.compact(cache.map(vm.formatColumn));
  };

  /**
   * @desc Format column
   * @param {*} column
   * @return {String}
   */
  vm.formatColumn = function(column) {
    if (typeof column !== 'string') {
      return;
    }

    return vm.formatColumnName(column);
  };

  /**
   * @desc Format value to display in column based on column.type
   * @param {String} field Name of field
   * @param {Object} column Column configuration
   * @param {Object} data Record being displayed in row
   * @returns {*}
   */
  vm.formatColumnValue = function(field, column, data) {
    var formattedValue;
    var value = data[field];

    // If no value, return empty string
    if (value === undefined || value === null) {
      return '';
    }

    // If column has no type, return raw value
    if (!column.type) {
      return data[field];
    }

    switch(column.type) {
      case 'money':
        formattedValue = vm.formatMoney(value);
        break;
      case 'percentage':
        formattedValue = value + ' %';
        break;
      case 'number':
        formattedValue = vm.formatNumber(value, 2);
        break;
      default:
        formattedValue = value;
    }

    return formattedValue;
  };

  /**
   * @desc Format column name
   * @param {String} name Name of column
   * @return {String}
   */
  vm.formatColumnName = function(name) {
    return name
      .replace(/_+/g, ' ')
      // Replace a completely all-capsed word with a
      // first-letter-capitalized version
      .replace(/^[A-Z]+$/, function (match) {
        return angular.lowercase(angular.uppercase(match.charAt(0)) + match.slice(1));
      })
      // Capitalize the first letter of words
      .replace(/(\w+)/g, function (match) {
        return angular.uppercase(match.charAt(0)) + match.slice(1);
      })
      // Put a space in between words that have partial capilizations
      // (i.e. 'firstName' becomes 'First Name')
      .replace(/(\w+?(?=[A-Z]))/g, '$1 ');
  };

  /**
   * @desc Display message to user if Google Sheets API request fails
   * @return {Object} vm
   */
  vm.onGetFail = function(data) {
    vm.message = 'Sheet could not be loaded due to API error.';
    return vm;
  };

  /**
   * @desc Sort rows in ascending order by key
   * @param {String} key Name of field to sort by
   * @return {Object} vm
   */
  vm.sortAsc = function(key) {
    vm.currentSort.direction = 'up';
    vm.rows = _.sortBy(vm.rows, key);
    return vm;
  };

  /**
   * @desc Sort rows in descending order by key
   * @param {String} key Name of field to sort by
   * @return {Object} vm
   */
  vm.sortDesc = function(key) {
    vm.currentSort.direction = 'down';
    vm.rows = _.sortBy(vm.rows, key).reverse();
    return vm;
  };

  /**
   * @desc Handle click event of <th> elements within <thead>
   * @param {String} key Name of column
   * @param {Object} $event
   */
  vm.onHeaderClick = function(key, $event) {
    var target = $($event.target);

    // Toggle .highlight
    $element.find('.highlight').removeClass('highlight');

    // Empty icons
    $element.find('.arrow').html('');

    // Add highlight class to header
    target.addClass('highlight');

    // Reset currentSort.direction if new key
    if (vm.currentSort.key != key) {
      vm.currentSort.direction = undefined;
    }

    // Set currentSort.key to key of clicked header
    vm.currentSort.key = key;

    // Call sort function based on current direction
    switch(vm.currentSort.direction) {
      case 'up':
        target.find('.arrow').html(vm.arrows.down);
        vm.sortDesc(key);
        break;
      case 'down':
        target.find('.arrow').html(vm.arrows.up);
        vm.sortAsc(key);
        break;
      default:
        target.find('.arrow').html(vm.arrows.up);
        vm.sortAsc(key);
    }

    return vm;
  };

  /**
   * @desc Remove .highlight class from all elements when mouse leaves
   * @return {Object}
   */
  vm.removeHighlight = function() {
    $element.find('.hover').removeClass('hover');
    return vm;
  };

  /**
   * @desc Handle hover event on <td> elements within <tbody>
   * @param {String} key Name of column
   * @return {Object}
   */
  vm.onCellHover = function(key) {
    if (vm.currentColumnHover != key) {
      vm.currentColumnHover = key;
      $element.find('td').removeClass('hover');
    }
    $element.find('td[data-key='+key+']').addClass('hover');
    return vm;
  };

  /**
   * Load spreadsheet
   */
  GoogleSheets
    .get($scope.config.sheet)
    .then(vm.onGetSuccess)
    .catch(vm.onGetFail);

  return vm;

}

// Inject dependencies
DatagridController.$inject = [ '$scope', '$element', 'GoogleSheets' ];

export default DatagridController;

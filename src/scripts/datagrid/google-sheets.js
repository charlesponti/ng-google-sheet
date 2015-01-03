'use strict';

var fx = require('money');

/**
 * @ngInject
 */
module.exports = function($q, $http, Constants) {
  /**
   * @desc Reference to service
   * @type {Object}
   */
  var service = {};

  /**
   * @desc Base RegExp to use
   * @type {String}
   */
  var baseRegex = [
    '(',
    Constants.CURRENCY_SYMBOLS
      .map(function (a) {
        // Escape all the currency symbols ($ at least will jack up this regex)
        return '\\' + a;
      })
      .join('|'),
    ')?'
    ].join('');

  /**
   * @desc RegExp for numbers, including currencies
   * @type {RegExp}
   */
  var numberRegex = new RegExp('^[-+]?'+baseRegex+'[\\d,.]+'+baseRegex+'%?$');

  /**
   * @desc Parse spreadsheet row content to find keys and values from columns
   * and rows
   * @param {Object} row
   * @return {Function}
   */
  service.getKeyAndValue = function(row) {
    return function(keyData) {
      var key = keyData.match(/\w*\W\s/)[0];
      var value = keyData.replace(key, '');

      if (numberRegex.test(value)) {
        value = fx(value)._v;
      }

      row[key.replace(': ', '')] = value;
    };
  };

  /**
   * @desc Construct object from spreadsheet row
   * @param {Object} entry Single row from API response
   * @return {Object}
   */
  service.getRows = function(entry) {
    var row = {
      ticker: entry.title.$t
    };

    entry.content.$t.split(', ').forEach(service.getKeyAndValue(row));

    return row;
  };

  /**
   * @desc Format data received from Google Sheets API
   * @param {Object} response
   */
  service.formatData = function(response) {
    var data = {
      title: response.feed.title.$t
    };

    data.rows = response.feed.entry.map(service.getRows);

    return data;
  };

  /**
   * @desc Get Google Sheet from API
   * @param  {String} key Google Spreadsheet key
   * @return {Promise}
   */
  service.get = function(key) {
    var defer = $q.defer();

    // Request spreadsheet
    $http
    .get(Constants.googleSheetsUrl.replace(':key', key))
    .success(function(response) {
      return defer.resolve(service.formatData(response));
    })
    .error(function(response) {
      return defer.reject(response);
    });

    return defer.promise;
  };

  return service;
};

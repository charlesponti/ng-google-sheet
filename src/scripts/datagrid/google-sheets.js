'use strict';

var fx = require('money');

/**
 * @ngInject
 */
module.exports = function($q, $http, Constants) {

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

  // /^[-+]?[£$¤¥]?[\d,.]+%?$/
  var numberRegex = new RegExp('^[-+]?'+baseRegex+'[\\d,.]+'+baseRegex+'%?$');

  var service = {};

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

  service.getRows = function(entry) {
    var row = {
      ticker: entry.title.$t
    };

    entry.content.$t.split(', ').forEach(service.getKeyAndValue(row));

    return row;
  };

  /**
   * Format data received from Google Sheets API
   * @param {Objec} response
   */
  service.formatData = function(response) {
    var data = {
      title: response.feed.title.$t
    };

    data.rows = response.feed.entry.map(service.getRows);

    return data;
  };

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

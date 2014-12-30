'use strict';

module.exports = function($q, $http) {

  var base = 'https://spreadsheets.google.com/feeds/list/:key/ow1vgqx/public/basic?alt=json';
  var key = '1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c';


  var service = {};

  service.getKeyAndValue = function(row) {
    return function(keyData) {
      var key = keyData.match(/\w*\W\s/)[0];
      var value = keyData.replace(key, '');
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
    .get(base.replace(':key', key))
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

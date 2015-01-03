'use strict';

/**
 * @ngInject
 */
module.exports = function() {

  this.config = {
    sheet: '1jEAO4g_C0NfGkMrLiqIIcXxbOmbfY5mvZ7GzevSi_5c',
    columns: [
      {
        field: 'ticker',
        header: 'Ticker'
      },
      {
        field: 'industry',
        header: 'Industry'
      },
      {
        field: 'marketcap',
        header: 'Market Cap',
        type: 'money'
      },
      {
        field: 'change',
        header: 'Change',
        type: 'percentage',
        class: "{red: (row.change < 0), green: (row.change > 0)}"
      },
      {
        field: 'price',
        header: 'Price',
        type: 'money'
      },
      {
        field: 'volume',
        header: 'Volume',
        type: 'number'
      }
    ]
  };

  this.title = "Welcome to Facade-Angular";

};

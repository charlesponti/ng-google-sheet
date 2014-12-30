describe('Services: GoogleSheets', function() {
  'use strict';

  var service, response;

  beforeEach(function(done) {
    response = {
      feed: {
        title: { $t: 'fooTitle'},
        entry: [
          {
            title: { $t: 'fooTicker' },
            content: { $t: 'foo: bar, bar: baz, baz: qux' }
          }
        ]
      }
    };
    angular.mock.module('trDatagrid');
    angular.mock.inject(function(GoogleSheets) {
      service = GoogleSheets;
      done();
    });
  });

  afterEach(function() {
    service =
    response = undefined;
  });

  describe('.formatData()', function() {
    it('should be return data', function() {
      expect(service.formatData(response)).toEqual({
        title: 'fooTitle',
        rows: [
          { ticker: 'fooTicker', foo: 'bar', bar: 'baz', baz: 'qux'}
        ]
      });
    });
  });

  describe('.getRows()', function() {
    it('should return formatted row', function() {
      expect(service.getRows(response.feed.entry[0])).toEqual({
        ticker: 'fooTicker',
        foo: 'bar',
        bar: 'baz',
        baz: 'qux'
      });
    });
  });

  describe('.getKeyAndValue()', function() {
    it('should add correct key and value to row', function() {
      var row = {};
      var text = response.feed.entry[0].content.$t.split(', ')[0];
      service.getKeyAndValue(row)(text);
      expect(row).toEqual({
        foo: 'bar'
      });
    });
  });

});

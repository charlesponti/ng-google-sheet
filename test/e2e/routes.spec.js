describe('E2E: Routes', function() {
  'use strict';

  it('should have a working home route', function() {
    browser.get('#/');
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });

});

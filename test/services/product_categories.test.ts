import app from '../../src/app';

describe('\'product_categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-categories');
    expect(service).toBeTruthy();
  });
});

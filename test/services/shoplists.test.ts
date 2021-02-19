import app from '../../src/app';

describe('\'shoplists\' service', () => {
  it('registered the service', () => {
    const service = app.service('shoplists');
    expect(service).toBeTruthy();
  });
});

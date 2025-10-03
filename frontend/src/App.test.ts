describe('App', () => {
  it('should be a function', () => {
    const App = require('./App').default;
    expect(typeof App).toBe('function');
  });
});

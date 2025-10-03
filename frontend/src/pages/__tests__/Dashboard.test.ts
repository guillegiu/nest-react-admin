describe('Dashboard', () => {
  it('should be a function', () => {
    const Dashboard = require('../Dashboard').default;
    expect(typeof Dashboard).toBe('function');
  });
});

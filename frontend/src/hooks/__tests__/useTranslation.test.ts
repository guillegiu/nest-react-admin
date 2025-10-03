describe('useTranslation', () => {
  it('should be a function', () => {
    const useTranslation = require('../useTranslation').default;
    expect(typeof useTranslation).toBe('function');
  });
});

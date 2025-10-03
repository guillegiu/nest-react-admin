describe('LanguageContext', () => {
  it('should export LanguageProvider', () => {
    const { LanguageProvider } = require('../LanguageContext');
    expect(typeof LanguageProvider).toBe('function');
  });

  it('should export useLanguage', () => {
    const { useLanguage } = require('../LanguageContext');
    expect(typeof useLanguage).toBe('function');
  });
});

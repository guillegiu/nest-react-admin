describe('Simple Test', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should test string', () => {
    const text = 'Hello World';
    expect(text).toBe('Hello World');
  });
});

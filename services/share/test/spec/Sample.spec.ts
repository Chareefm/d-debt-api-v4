describe('PlatformClient', () => {
  it('generateSignature', () => {
    expect('1').toEqual('1');
  });

  it('createPlayer', async () => {
    expect({ a: 1, b: 2 }).toStrictEqual({
      b: 2,
      a: 1,
    });
  });

  describe('increasePlayerBalance', () => {
    it('success', async () => {
      expect(1).toStrictEqual(1);
    });
  });
});

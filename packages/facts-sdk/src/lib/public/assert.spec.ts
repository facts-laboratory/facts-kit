import { assert } from './assert';

describe.skip('assert', () => {
  it('should work', async () => {
    const factMarket = await assert({
      data: {}, // Data will be stringified and used as the "contract data"
      description: '<description>',
      owner: '<wallet-address>',
      title: '<title>',
      rebutTx: '<tx>', // Optional
      topic: 'test', // Optional
    });
    expect(typeof factMarket.tx).toBe('string');
  });
});

import { assert } from './assert';

describe.skip('assert', () => {
  it('should work', async () => {
    const factMarket = await assert({
      data: {}, // Data will be stringified and used as the "contract data"
      tags: {
        description: '<description>',
        title: '<title>',
        topics: ['test'], // Optional
        type: 'fact-post',
      },
      position: 'oppose',
    });
    expect(typeof (factMarket as { tx: string }).tx).toBe('string');
  });
});

import { setupGlobals } from '../mock/setup-globals';
import { assert } from './assert';

describe('assert', () => {
  beforeAll(() => {
    setupGlobals();
  });
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
    console.log('FACT MARKET', factMarket);
    expect(typeof (factMarket as { tx: string }).tx).toBe('string');
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import esmock from 'esmock';

test('should fetch data from Redstone API despite failure in fetching remaining data', async () => {
  // Set up a mock for `fetchRemainingData`
  const mocked = await esmock('../src/lib/fetch-prices.js', {
    fetchRemainingData: () => { throw new Error('Mocked failure'); },
  });

  // Now when `getPrices` is called, it should use your mocked `fetchRemainingData` function
  let prices;
  try {
    prices = await mocked.getPrices();
  } catch (error) {
    console.error(error);
  }
  
  assert(prices);
  assert(typeof prices === 'object');
});

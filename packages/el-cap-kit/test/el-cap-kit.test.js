import test from 'node:test';
import assert from 'node:assert/strict';
import esmock from 'esmock';
import { fetchRemainingData } from '../src/lib/fetch-prices.js';

test('should fetch data from Redstone API despite failure in fetching remaining data', async () => {
    const mockedData = { key1: 'value1', key2: 'value2', key3: 'value3' };
  
    // Set up a mock for `fetchData` function to simulate a fetch failure
    const fetchData = async (url, errorMessage) => {
      throw new Error('Simulated fetch failure');
    };
  
    // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
    const mocked = await esmock('../src/lib/el-cap-kit.js', {
        '../src/lib/fetch-prices.js': {
          fetchRedstonePrices: async () => mockedData,
          fetchRemainingData: fetchRemainingData  // use real fetchRemainingData
        },
        'node-fetch': fetchData
      });
      
  
    let prices;
    try {
      prices = await mocked.getPrices();
    } catch (error) {
      console.error(error);
    }
    
    console.log('Prices:', prices);
    assert(prices);
    assert(typeof prices === 'object');
    assert.deepStrictEqual(prices, { redstone: mockedData });
  });
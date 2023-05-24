import test from 'node:test';
import assert from 'node:assert/strict';
import esmock from 'esmock';
import { fetchRedstonePrices, fetchRemainingData } from '../src/lib/fetch-prices.js';
import { getPrices } from '../src/lib/el-cap-kit.js';

test('should return correct structure', async () => {
    const result = await getPrices();
    console.log('Result:', result);

    // General structure
    assert.ok(result.redstone, 'Expected property "redstone"');
    assert.ok(result.remaining, 'Expected property "remaining"');

    // Test redstone structure for the first coin
    const firstCoinKey = Object.keys(result.redstone)[0];
    const firstCoinData = result.redstone[firstCoinKey];
    console.log('First Coin Data:', firstCoinData, 'First Coin Key:', firstCoinKey);

    const coinProps = ['id', 'symbol', 'provider', 'value', 'liteEvmSignature', 'permawebTx', 'version', 'timestamp', 'minutes', 'providerPublicKey'];
    coinProps.forEach(prop => {
      assert.ok(firstCoinData[prop], `Expected property "${prop}"`);
    });

    // Test remaining structure for the first remaining coin, if it exists
    if (result.remaining.length > 0) {
        const firstRemainingCoin = result.remaining[0];
        const remainingKeys = ['id', 'symbol', 'name', 'image', 'current_price', 'market_cap', 'market_cap_rank', 'total_volume', 'high_24h', 'low_24h', 'price_change_24h', 'price_change_percentage_24h', 'market_cap_change_24h', 'market_cap_change_percentage_24h', 'circulating_supply', 'total_supply', 'max_supply', 'ath', 'ath_change_percentage', 'ath_date', 'atl', 'atl_change_percentage', 'atl_date', 'last_updated'];
        remainingKeys.forEach(key => {
            assert.ok(firstRemainingCoin[key], `Expected property "${key}"`);
        });
    } else {
        console.warn('API limit reached, skipping remaining coin checks');
    }
});



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
          fetchData: fetchData
        },
        '../src/lib/el-cap-kit.js': {

            fetchData: fetchData
   
          },
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
      assert.deepStrictEqual(prices, {  redstone: mockedData, remaining: {} }) 
    });
  test('should fetch data from CoinGecko API despite failure in fetching Redstone data', async () => {
    const mockedData = { redstone: {}, remaining: {key1: 'value1', key2: 'value2', key3: 'value3'}};
  
    // Set up a mock for `fetchData` function to simulate a fetch failure
    const fetchData = async (url, errorMessage) => {
        throw new Error('Simulated fetch failure');
      }
  
    // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
    const mocked = await esmock('../src/lib/el-cap-kit.js', {
        '../src/lib/fetch-prices.js': {
          fetchRemainingData: async () => mockedData,
          fetchData: fetchData
        },
        '../src/lib/el-cap-kit.js': {

            fetchData: fetchData
   
          },
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
    assert.deepStrictEqual(prices, mockedData);
  });

  test('should handle failure in fetching both Redstone and CoinGecko data', async () => {
    // Set up a mock for `fetchData` function to simulate a fetch failure
    const fetchData = async (url, errorMessage) => {
        throw new Error('Simulated fetch failure');
    }

    // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
    const mocked = await esmock('../src/lib/el-cap-kit.js', {
        '../src/lib/fetch-prices.js': {
          fetchData: fetchData
        },
        'node-fetch': fetchData,
        '../src/lib/el-cap-kit.js': {

            fetchData: fetchData
   
          },
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
    // When both fetch operations fail, your function should return an object with 'redstone' and 'remaining' properties set to empty objects
    assert.deepStrictEqual(prices, { redstone: {}, remaining: {} });
});

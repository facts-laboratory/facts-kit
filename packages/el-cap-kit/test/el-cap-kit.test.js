import test from 'node:test';
import assert from 'node:assert/strict';
import esmock from 'esmock';
import { get24hPrice, getPrices } from '../src/lib/el-cap-kit.js';
import { get } from 'node:https';

test('should return correct structure', async () => {
  const result = await getPrices();

  // General structure
  assert.ok(result.redstone, 'Expected property "redstone"');
  assert.ok(result.remaining, 'Expected property "remaining"');

  // Test redstone structure for the first coin
  const firstCoinKey = Object.keys(result.redstone)[0];
  const firstCoinData = result.redstone[firstCoinKey];

  const coinProps = [
    'id',
    'symbol',
    'provider',
    'value',
    'liteEvmSignature',
    'permawebTx',
    'version',
    'timestamp',
    'providerPublicKey',
  ];
  coinProps.forEach((prop) => {
    assert.ok(firstCoinData[prop], `Expected property "${prop}"`);
  });

  // Test remaining structure for the first remaining coin, if it exists
  if (Object.keys(result.remaining).length > 0) {
    const firstRemainingCoinKey = Object.keys(result.remaining)[0];
    const firstRemainingCoin = result.remaining[firstRemainingCoinKey];
    const remainingKeys = [
      'id',
      'symbol',
      'name',
      'image',
      'current_price',
      'market_cap',
      'market_cap_rank',
      'total_volume',
      'high_24h',
      'low_24h',
      'price_change_24h',
      'price_change_percentage_24h',
      'market_cap_change_24h',
      'market_cap_change_percentage_24h',
      'circulating_supply',
      'total_supply',
      'max_supply',
      'ath',
      'ath_change_percentage',
      'ath_date',
      'atl',
      'atl_change_percentage',
      'atl_date',
      'last_updated',
    ];
    remainingKeys.forEach((key) => {
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

  const fetchPrices = await esmock('../src/lib/fetch-prices.js', {
    '../src/lib/fetch.js': {
      fetchData: fetchData,
    },
  });

  // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
  const mocked = await esmock('../src/lib/el-cap-kit.js', {
    '../src/lib/fetch-prices.js': {
      ...fetchPrices,
      fetchRedstonePrices: async () => mockedData,
    },
    '../src/lib/fetch.js': {
      fetchData: fetchData,
    },
  });

  let prices;
  try {
    prices = await mocked.getPrices();
  } catch (error) {
    console.error(error);
  }

  assert(prices);
  assert(typeof prices === 'object');
  assert.deepStrictEqual(prices, { redstone: mockedData, remaining: {} });
});
test('should fetch data from CoinGecko API despite failure in fetching Redstone data', async () => {
  const mockedData = {
    redstone: {},
    remaining: { key1: 'value1', key2: 'value2', key3: 'value3' },
  };

  // Set up a mock for `fetchData` function to simulate a fetch failure
  const fetchData = async (url, errorMessage) => {
    throw new Error('Simulated fetch failure');
  };

  // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
  const fetchPrices = await esmock('../src/lib/fetch-prices.js', {
    '../src/lib/fetch.js': {
      fetchData: fetchData,
    },
  });

  // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
  const mocked = await esmock('../src/lib/el-cap-kit.js', {
    '../src/lib/fetch-prices.js': {
      ...fetchPrices,
      fetchRemainingData: async () => mockedData,
    },
  });
  let prices;
  try {
    prices = await mocked.getPrices();
  } catch (error) {
    console.error(error);
  }

  assert(prices);
  assert(typeof prices === 'object');
  assert.deepStrictEqual(prices, mockedData);
});

test('should handle failure in fetching both Redstone and CoinGecko data', async () => {
  // Set up a mock for `fetchData` function to simulate a fetch failure
  const fetchData = async (url, errorMessage) => {
    throw new Error('Simulated fetch failure');
  };

  // Set up a mock for `fetchRemainingData` and `fetchRedstonePrices`
  const fetchPrices = await esmock('../src/lib/fetch-prices.js', {
    '../src/lib/fetch.js': {
      fetchData: fetchData,
    },
  });

  const mocked = await esmock('../src/lib/el-cap-kit.js', {
    '../src/lib/fetch-prices.js': fetchPrices,
  });

  let prices;
  try {
    prices = await mocked.getPrices();
  } catch (error) {
    console.error(error);
  }

  assert(prices);
  assert(typeof prices === 'object');
  // When both fetch operations fail, your function should return an object with 'redstone' and 'remaining' properties set to empty objects
  assert.deepStrictEqual(prices, { redstone: {}, remaining: {} });
});

test('should return historical prices for the last 24 hours', async () => {
  const symbol = 'AR';
  const prices = await get24hPrice(symbol);
  console.log('prices', prices);

  assert(prices, 'Prices should not be null or undefined');
  assert(Array.isArray(prices), 'Prices should be an array');
  assert(prices.length > 0, 'Prices array should not be empty');

  const firstItem = prices[0];
  assert(
    Object.prototype.hasOwnProperty.call(firstItem, 'value'),
    'First item should have a "value" property'
  );
  assert(
    Object.prototype.hasOwnProperty.call(firstItem, 'timestamp'),
    'First item should have a "timestamp" property'
  );
});

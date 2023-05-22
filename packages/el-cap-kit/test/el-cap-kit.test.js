/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
const test = suite('el-cap-kit');
import {
  fetchRemainingData,
  fetchRedstoneData,
} from '../src/lib/el-cap-kit.js';

import { getPrices } from '../src/lib/get-redstone-prices.js';

test.before(async () => {});

test('should not allow claiming without txId', () => {
  const prices = getPrices('test');
  const prices2 = getPrices('test');
});

test.skip('should fetch coin data from Coingecko API', async () => {
  const coinData = await fetchRemainingData();
  assert.instance(coinData, Array, 'Coin data should be an array');
  // Add additional assertions to validate the coin data
});

test.skip('should fetch data from Redstone API', async () => {
  const redstoneData = await fetchRedstoneData();
  assert.instance(redstoneData, Object, 'Redstone data should be an object');
  // Add additional assertions to validate the Redstone data
});

test.after(async () => {});

test.run();

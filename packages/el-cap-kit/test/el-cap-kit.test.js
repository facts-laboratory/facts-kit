/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
const test = suite('el-cap-kit');

import { getPrices } from '../src/lib/el-cap-kit.js';

test.before(async () => {});

test('should return correct structure', async () => {
    const result = await getPrices();
  
    // General structure
    assert.ok(result.resdstone, 'Expected property "resdstone"');
    assert.ok(result.remaining, 'Expected property "remaining"');
  
    // Test resdstone structure for the first coin
    const firstCoinData = result.resdstone[Object.keys(result.resdstone)[0]];
    const coinProps = ['id', 'symbol', 'provider', 'value', 'liteEvmSignature', 'permawebTx', 'version', 'timestamp', 'minutes', 'providerPublicKey'];
  
    coinProps.forEach(prop => {
      assert.ok(firstCoinData[prop], `Expected property "${prop}"`);
    });
  
    // Test remaining structure for the first remaining coin
    const firstRemainingCoin = result.remaining[0];
    const remainingKeys = ['id', 'symbol', 'name', 'image', 'current_price', 'market_cap', 'market_cap_rank', 'total_volume', 'high_24h', 'low_24h', 'price_change_24h', 'price_change_percentage_24h', 'market_cap_change_24h', 'market_cap_change_percentage_24h', 'circulating_supply', 'total_supply', 'max_supply', 'ath', 'ath_change_percentage', 'ath_date', 'atl', 'atl_change_percentage', 'atl_date', 'last_updated'];
    
    remainingKeys.forEach(key => {
      assert.ok(firstRemainingCoin[key], `Expected property "${key}"`);
    });
  });
  

test.after(async () => {});

test.run();

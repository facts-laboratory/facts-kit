import { buy } from './buy';
import { setupGlobals } from '../mock/setup-globals';

import 'isomorphic-fetch';

describe('buy', () => {
  beforeAll(async () => {
    await setupGlobals();
  });
  it(
    'should work',
    async () => {
      const output = await buy({
        contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
        positionType: 'support',
        qty: 1,
      });

      console.log('OUTPUT', output);
      expect(output).toEqual('facts-sdk');
    },
    { timeout: 60000 }
  );
});

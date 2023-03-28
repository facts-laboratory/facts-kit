import { setupGlobals } from '../../mock/setup-globals';
import { payFactMarket } from './pay-fact-market';

import 'isomorphic-fetch';

describe.skip('allow', () => {
  beforeAll(async () => {
    await setupGlobals();
  });

  it('should payFactMarket', async () => {
    const output = await payFactMarket({
      contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
      positionType: 'oppose',
      funcInput: {
        fee: 1,
        price: 20,
      },
    });

    console.log('============ OUTPUT', output);
    expect(output.funcInput?.txId?.length).toBe(43);
  });
});

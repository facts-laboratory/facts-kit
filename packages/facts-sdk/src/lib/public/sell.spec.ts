import { buy } from './buy';
import { setupGlobals } from '../mock/setup-globals';

describe.skip('buy', () => {
  beforeAll(() => {
    setupGlobals();
  });
  test('should work', async () => {
    const output = await buy({
      contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
      positionType: 'support',
      qty: 1,
    });

    expect(output?.originalTxId.length).toEqual(43);
  });
});

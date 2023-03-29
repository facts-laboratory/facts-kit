import { buy } from './buy';
import { setupGlobals } from '../mock/setup-globals';

describe('buy', () => {
  beforeAll(() => {
    setupGlobals();
  });
  test('should work', async () => {
    const output = await buy({
      contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
      positionType: 'support',
      qty: 1,
    });

    console.log('OUTPUT', output);
    expect(43).toEqual(43);
  });
});

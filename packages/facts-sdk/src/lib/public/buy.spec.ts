import { buy } from './buy';
import { setupGlobals } from '../mock/setup-globals';

describe.skip('buy', () => {
  beforeAll(() => {
    setupGlobals();
  });
  test('should work', async () => {
    const position = await buy({
      contract: 'VDcJqs6_mfUTQuoTYvxTtzRDLFenHkaQUOVkmIJF4tA',
      positionType: 'support',
      qty: 1,
    });

    expect(position?.originalTxId.length).toEqual(43);
  });
});

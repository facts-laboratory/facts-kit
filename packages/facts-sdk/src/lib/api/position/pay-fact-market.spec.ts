import { setupGlobals } from '../../mock/setup-globals';
import { payFactMarket } from './pay-fact-market';

describe.skip('pay-fact-market', () => {
  beforeAll(async () => {
    await setupGlobals();
  });

  it('should payFactMarket', async () => {
    const output = await payFactMarket({
      contract: 'l7JE0Xyjn7FZq18LqznZvLzdUWBt-oWOfbx4Ynf2iWE',
      positionType: 'oppose',
      funcInput: {
        fee: 1,
        price: 1,
      },
    });

    expect(output.funcInput?.txId?.length).toBe(43);
  });
});

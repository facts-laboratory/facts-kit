import { sell } from './sell';
// import { setupGlobals } from '../mock/setup-globals';
import { newReadState } from '../helpers/read-state';

describe('sell', () => {
  beforeAll(() => {
    // setupGlobals();
  });
  test('should work', async () => {
    const position = await sell({
      contract: 'VDcJqs6_mfUTQuoTYvxTtzRDLFenHkaQUOVkmIJF4tA',
      positionType: 'support',
      qty: 1,
    });

    const state = await newReadState(
      'VDcJqs6_mfUTQuoTYvxTtzRDLFenHkaQUOVkmIJF4tA'
    );
    console.log('State', state);

    expect(position?.originalTxId.length).toEqual(43);
  });
});

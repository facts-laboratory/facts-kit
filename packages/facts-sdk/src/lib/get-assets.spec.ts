import { getAssets } from './get-assets';

describe.skip('get assets', () => {
  it('should work', () => {
    expect(getAssets()).toEqual('facts-sdk');
  });
});

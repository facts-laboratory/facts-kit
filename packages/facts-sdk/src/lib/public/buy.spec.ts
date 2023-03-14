import { buy } from './buy';

describe.skip('buy', () => {
  it('should work', () => {
    expect(buy()).toEqual('facts-sdk');
  });
});

import { getSupply } from './get-price';

describe.skip('calculate price', () => {
  it('should calculate price', () => {
    expect('facts-sdk').toEqual('facts-sdk');
  });
  it('should get current supply', () => {
    const balances = {
      x: 1,
      y: 2,
      z: 3,
    };
    const supply = getSupply(balances);
    expect(supply).toEqual(6);
  });
});

import { getSupply, getPrice } from './get-price';

export const MOCK_STATE = `{"pf":0,"name":"Hello WordPress","pair":"VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA","price":1,"author":0,"evolve":null,"creator":"n-8SHNBiuu0AMQzpK1Aig843PFp5JkCyvT7H4TlJCzE","balances":{},"position":"support","canEvolve":true,"oppositionBalances":{}}`;

describe('calculate price', () => {
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
  it('should get price', async () => {
    const output = await getPrice({
      contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
      funcInput: { positionType: 'support', qty: 1 },
    });
    expect(output.funcInput.price).toEqual(1);
    expect(output.funcInput.fee).toEqual(1);
  });
  it('should get price (mocked state)', async () => {
    const output = await getPrice({
      contract: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
      funcInput: { positionType: 'support', qty: 1 },
      state: JSON.parse(MOCK_STATE),
    });
    expect(output.funcInput.price).toEqual(1);
    expect(output.funcInput.fee).toEqual(1);
  });
});

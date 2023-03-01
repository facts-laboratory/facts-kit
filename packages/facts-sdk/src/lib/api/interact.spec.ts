import { interaction } from './interact';
import { BuyInput } from './interface';
import Arweave from 'arweave';

describe.skip('interact', () => {
  it('should work query a tx', async () => {
    (globalThis as any).Arweave = Arweave;
    const tx = await interaction({ function: 'buy' } as BuyInput, '', []);
    expect(tx).toEqual('facts-sdk');
  });
});

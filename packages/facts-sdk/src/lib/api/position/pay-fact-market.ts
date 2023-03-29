import { allow } from '@facts-kit/contract-kit';
import { BuyInput, State } from '../../faces/state';
import { warpAllow } from './interact';

const BAR_TX = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA';

export async function payFactMarket(input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  positionType: 'support' | 'oppose';
  state?: State;
}): Promise<{
  funcInput: Partial<BuyInput>;
  contract: string;
  positionType: 'support' | 'oppose';
  state?: State;
}> {
  console.log('🐘🐘🐘🐘🐘 Step 3 payFactMarket');
  const { funcInput, contract } = input;
  const { fee, price } = funcInput;
  const newFee = fee || 0;
  const newPrice = price || 0;
  const tx = await warpAllow(newPrice + newFee, contract, BAR_TX);
  console.log('TX', tx);
  return {
    ...input,
    funcInput: {
      ...funcInput,
      txId: 'tx',
    },
  };
}

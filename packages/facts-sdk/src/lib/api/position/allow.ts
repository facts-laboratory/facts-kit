import { allow } from '@facts-kit/contract-kit';
import { BuyInput, State } from '../interface';

const BAR_TX = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA';

export async function allowBar(input: {
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
  const { funcInput, contract } = input;
  const { fee, price } = funcInput;

  const tx = await allow((price || 0) + (fee || 0), contract, BAR_TX);
  return {
    ...input,
    funcInput: {
      ...funcInput,
      txId: tx,
    },
  };
}

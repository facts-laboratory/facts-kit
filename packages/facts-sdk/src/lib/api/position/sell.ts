import { SellInput, State } from '../../faces/state';
import { getReturns } from './get-price';
import { interact, pipeP } from './interact';

export async function sell(input: {
  funcInput: Partial<SellInput>;
  contract: string;
  state?: State;
}) {
  const { funcInput, contract, state } = input;
  const fn = pipeP([getReturns, interact]);
  return fn({
    funcInput: {
      ...(funcInput as SellInput),
    },
    state,
    positionType: funcInput.positionType as 'support' | 'oppose',
    contract,
    qty: funcInput.qty as number,
  });
}

import { position } from '../api';
import { State } from '../faces/state';

export async function sell(input: {
  contract: string;
  qty: number;
  expected?: number;
  positionType: 'support' | 'oppose';
  state?: State;
}) {
  const { contract, qty, positionType, state, expected } = input;
  return await position.sell({
    funcInput: {
      positionType,
      qty,
      function: 'sell',
      expected,
    },
    contract,
    state,
  });
}

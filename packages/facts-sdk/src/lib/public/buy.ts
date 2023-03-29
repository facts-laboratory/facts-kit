import { position } from '../api';
import { State } from '../faces/state';
export async function buy(input: {
  contract: string;
  qty: number;
  positionType: 'support' | 'oppose';
  state?: State;
}) {
  const { contract, qty, positionType, state } = input;
  return await position.buy({
    funcInput: {
      positionType,
      qty,
      function: 'buy',
    },
    contract,
    state,
  });
}

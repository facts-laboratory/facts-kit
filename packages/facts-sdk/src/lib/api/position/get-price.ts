import { compose, values, sum } from 'ramda';

import { BuyInput, SellInput, State } from '../../faces/state';
import {
  calculateFeeBits,
  calculatePriceBits,
} from '../../helpers/calculate-price';
import { newReadState } from '../../helpers/read-state';

export function getSupply(balances: { [address: string]: number }) {
  const supply = sum(compose(values)(balances));
  return supply;
}

export function getTotalFactMarketSupply(state: State) {
  return (
    getSupply(state.balances || {}) + getSupply(state.oppositionBalances || {})
  );
}

/**
 * @description Retuns price and fee.
 *
 * @author @jshaw-ar
 * @export
 * @param {string} contract
 * @param {('support' | 'oppose')} positionType
 * @param {number} qty
 * @param {State} [state]
 * @return {*}
 */
export async function getPrice(input: {
  funcInput: BuyInput;
  contract: string;
  state?: State;
  positionType: 'support' | 'oppose';
  qty: number;
}): Promise<{
  funcInput: BuyInput;
  contract: string;
  state?: State;
}> {
  console.log('🐘🐘🐘🐘🐘 Step 1 (getPrice)', JSON.stringify(input));
  const { funcInput, contract, state, positionType, qty } = input;
  if (!qty || qty < 1) throw new Error('Invalid quantity.');

  const newState = state || ((await newReadState(contract)) as State);
  const supply = getSupply(getBalances(positionType, newState));
  const price = Math.ceil(calculatePriceBits(1, 1, supply, supply + qty));

  return {
    contract,
    funcInput: {
      ...funcInput,
      price,
      fee: calculateFeeBits(price),
    },
  };
}

function getBalances(positionType: 'support' | 'oppose', state: State) {
  return positionType === 'support' ? state.balances : state.oppositionBalances;
}

export async function getReturns(input: {
  funcInput: SellInput;
  contract: string;
  state?: State;
  positionType: 'support' | 'oppose';
  qty: number;
  expected?: number;
}) {
  const { state, contract, qty, positionType, funcInput, expected } = input;
  if (expected) {
    return {
      contract,
      funcInput: {
        ...funcInput,
        expected,
      },
    };
  }
  const newState = state || ((await newReadState(contract)) as State);
  const supply = getSupply(getBalances(positionType, newState));
  const newQty = Math.floor(qty);
  const returns =
    Math.floor(calculatePriceBits(1, 1, supply, supply - newQty)) * -1;

  return {
    contract,
    funcInput: {
      ...funcInput,
      expected: returns,
    },
  };
}

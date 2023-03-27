import { readState } from '@facts-kit/contract-kit';
import { compose, values, sum } from 'ramda';

import { BuyInput, State } from '../interface';
import { InteractionInput } from './interact';
import {
  calculateFeeBits,
  calculatePriceBits,
} from '../../helpers/calculate-price';

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
  funcInput: Partial<BuyInput>;
  contract: string;
  positionType: 'support' | 'oppose';
  state?: State;
}): Promise<InteractionInput> {
  const { funcInput, contract, positionType, state } = input;
  const qty = funcInput.qty || 0;
  if (qty < 1) throw new Error('Invalid quantity.');
  const newState = state || ((await readState(contract)) as State);
  const supply = getSupply(getBalances(positionType, newState));
  const newQty = Math.floor(qty);
  const price = Math.ceil(calculatePriceBits(1, 1, supply, supply + newQty));

  return {
    contract,
    funcInput: {
      ...funcInput,
      qty: newQty,
      price,
      fee: calculateFeeBits(price),
    },
  };
}

function getBalances(positionType: 'support' | 'oppose', state: State) {
  return positionType === 'support' ? state.balances : state.oppositionBalances;
}

export async function getReturns(
  contract: string,
  positionType: 'support' | 'oppose',
  qty: number,
  state?: State
) {
  const newState = state || ((await readState(contract)) as State);
  const supply = getSupply(getBalances(positionType, newState));
  const newQty = Math.floor(qty);
  const price =
    Math.floor(calculatePriceBits(1, 1, supply, supply - newQty)) * -1;

  return {
    receive: price,
  };
}

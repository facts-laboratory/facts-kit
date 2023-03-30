/* eslint-disable no-useless-escape */
import { SellInput, State } from '../../faces/state';
import { payFactMarket } from './pay-fact-market';
import { getPrice } from './get-price';
import { interact, pipeP } from './interact';
import { getEdges } from '@facts-kit/contract-kit';

export async function sell(input: {
  funcInput: Partial<SellInput>;
  contract: string;
  state?: State;
}) {
  const fn = pipeP([getPrice, payFactMarket, interact]);
  return fn(input);
}

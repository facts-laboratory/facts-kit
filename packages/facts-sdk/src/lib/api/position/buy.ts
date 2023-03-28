import { BuyInput, State } from '../../faces/state';
import { payFactMarket } from './pay-fact-market';
import { getPrice } from './get-price';
import { interact, pipeP } from './interact';

export async function buy(input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  state?: State;
}) {
  console.log('STARTING BUY PIPE');
  const fn = pipeP([getPrice, payFactMarket, interact]);
  return fn(input);
}

import { BuyInput, State } from '../interface';
import { allowBar } from './allow';
import { getPrice } from './get-price';
import { interact, pipeP } from './interact';

export async function buy(input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  positionType: 'support' | 'oppose';
  state?: State;
}) {
  const fn = pipeP([getPrice, allowBar, interact]);
  return fn(input);
}

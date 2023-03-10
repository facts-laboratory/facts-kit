import { quasiAtomicFactMarket } from './api';

export async function attach(
  input: quasiAtomicFactMarket.AttachFactMarketInput
) {
  return await quasiAtomicFactMarket.attachFactMarket(input);
}

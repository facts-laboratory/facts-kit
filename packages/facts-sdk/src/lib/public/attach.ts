import { attach as attachApi } from './../api';

export async function attach(input: attachApi.AttachFactMarketInput) {
  return await attachApi.attachFactMarket(input);
}

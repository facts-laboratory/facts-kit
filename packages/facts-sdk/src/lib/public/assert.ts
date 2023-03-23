import { DeployAtomicFactMarketInput } from '../faces';
import { atomicFactMarket } from './../api';

/**
 * Deploys a new assertion with fact markets.
 *
 * @author mogulx_operates
 * @export
 * @param {DeployAtomicFactMarketInput} input
 * @return {*}  {Promise<{ tx: string }>}
 */
export async function assert(input: DeployAtomicFactMarketInput) {
  return await atomicFactMarket.deployAtomicFactMarket({
    ...input,
  });
}

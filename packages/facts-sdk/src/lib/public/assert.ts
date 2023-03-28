import { DeployAtomicFactMarketInput } from '../faces';
import { deploy } from './../api';

/**
 * Deploys a new assertion with fact markets.
 *
 * @author @jshaw-ar
 * @export
 * @param {DeployAtomicFactMarketInput} input
 * @return {*}  {Promise<{ tx: string }>}
 */
export async function assert(input: DeployAtomicFactMarketInput) {
  return await deploy.deployAtomicFactMarket({
    ...input,
  });
}

import { Warp } from 'warp-contracts';
import { getWarpFactory } from '../common/warp';
import { State } from '../faces';

export const newReadState = async (tx: string) => {
  const CACHE = 'https://cache.permapages.app';
  const warp = getWarpFactory() as Warp;
  const contract = await warp
    .contract<State>(tx)
    .syncState(CACHE + '/contract', { validity: true });
  const state = await contract
    .setEvaluationOptions({
      internalWrites: true,
      allowBigInt: true,
      // unsafeClient: 'skip',
    })
    .readState();

  return state.cachedValue.state;
};

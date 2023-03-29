import { Warp } from 'warp-contracts';
import { getWarpFactory } from '../common/warp';
import { State } from '../faces';

export const newReadState = async (tx: string) => {
  const CACHE = 'https://cache.permapages.app';
  const warp = getWarpFactory() as Warp;
  console.log('READING STATE', tx);
  const contract = await warp
    .contract<State>(tx)
    .syncState(CACHE + '/contract', { validity: true });
  console.log('WTF?');
  const state = await contract
    .setEvaluationOptions({
      internalWrites: true,
      allowBigInt: true,
      // unsafeClient: 'skip',
    })
    .readState();
  console.log('STATE', state);

  return state.cachedValue.state;
};

import { WarpFactory } from 'warp-contracts';

export const newReadState = async (tx) => {
  try {
    const CACHE = 'https://cache.permapages.app';
    const warp = WarpFactory.forMainnet();
    console.log('READING STATE', tx);
    const contract = await warp
      .contract(tx)
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
  } catch (error) {
    console.log(error);
  }
};

newReadState('gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs').then(console.log);

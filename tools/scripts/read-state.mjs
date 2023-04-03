import fs from 'fs';
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

export async function warpAllow() {
  const jwk = JSON.parse(
    fs.readFileSync(process.env['PATH_TO_WALLET'] || '').toString()
  );

  const CACHE = 'https://cache.permapages.app';
  const warp = WarpFactory.forMainnet();

  console.log(
    'WHEN DO WE TX SIGN?',
    'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
  );
  await warp
    .contract('VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA')
    .syncState(CACHE + '/contract', { validity: true });
  console.log('TEST');
  const contract = warp
    .contract('VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA')
    .connect(jwk)
    .setEvaluationOptions({
      internalWrites: true,
    });
  console.log('=================== DO WE GET HERE?');
  const action = await contract.writeInteraction({
    function: 'allow',
    target: 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs',
    qty: 2,
  });
  console.log('Written', action);
  return 'TEST';
}

warpAllow().then(console.log);

import { pipeWith } from 'ramda';
import { BuyInput, SellInput, State } from '../../faces/state';
import { getWarpFactory } from '../../common/warp';
import { Warp } from 'warp-contracts';

/**
 * @jshaw-ar
 * @description A pipe that can be used with promises.
 *
 */
export const pipeP = pipeWith((f, res) => {
  // promise
  if (res && res.then) {
    return res.then(f);
  }
  // array of promises
  if (Array.isArray(res) && res.length && res[0] && res[0].then) {
    return Promise.all(res).then(f);
  }
  // pure function
  return f(res);
});

/**
 * @author @jshaw-ar
 * @export
 * @interface InteractionInput
 */
export interface InteractionInput {
  funcInput: Partial<BuyInput | SellInput>;
  contract: string;
  tags?: { name: string; value: string }[];
}

/**
 * @description Posts a smartweave interaction.
 *
 * @author @jshaw-ar
 * @export
 * @param {InteractionInput} input
 * @return {*}
 */
export async function interact(input: InteractionInput) {
  console.log('===🐘🐘🐘🐘🐘 Step 4 (interact)', input);
  const fn = pipeP([warpWriteInteraction]);
  return fn(input);
}

export async function warpWriteInteraction(input: InteractionInput) {
  const { funcInput, contract } = input;
  const warp = getWarpFactory() as Warp;
  const interaction = await warp
    .contract<State>(contract)
    .connect('use_wallet')
    .setEvaluationOptions({
      internalWrites: true,
    })
    .writeInteraction({
      ...funcInput,
    });

  return interaction;
}

export async function warpAllow(
  amount: number,
  target: string,
  barContractId: string
) {
  const CACHE = 'https://cache.permapages.app';
  const warp = getWarpFactory() as Warp;

  await warp
    .contract(barContractId)
    .syncState(CACHE + '/contract', { validity: true });
  const contract = warp
    .contract(barContractId)
    .connect('use_wallet')
    .setEvaluationOptions({
      internalWrites: true,
    });
  const action = await contract.writeInteraction({
    function: 'allow',
    target,
    qty: amount,
  });
  console.log('Written', action?.originalTxId);
  return action?.originalTxId;
}

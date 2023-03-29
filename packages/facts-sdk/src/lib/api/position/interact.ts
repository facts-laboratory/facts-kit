import { pipeWith } from 'ramda';
import Transaction from 'arweave/node/lib/transaction';

import { getArweave } from '@facts-kit/contract-kit';

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

const REDSTONE_GATEWAY = 'https://gateway.redstone.finance';

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

  console.log('INTERACTION', interaction);
  return interaction;
}
/**
 * @description Creates the transaction
 *
 * @author @jshaw-ar
 * @param {InteractionInput} interactionInput
 * @return {*}
 */
async function createTx(interactionInput: InteractionInput) {
  console.log('🐘🐘🐘🐘🐘 Interact: 1 (createTx)');
  const arweave = getArweave();
  const tx = await arweave.createTransaction({
    data: 'facts-sdk',
    // reward: "72600854",
    // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
  });
  return { tx, interactionInput: interactionInput };
}

/**
 * @description Adds smartweave tags for the tx and any
 * additional tags that are passed to the function
 *
 * @author @jshaw-ar
 * @param {{
 *   interactionInput: InteractionInput;
 *   tx: Transaction;
 * }} input
 * @return {*}  {{
 *   tx: Transaction;
 *   input: InteractionInput;
 * }}
 */
function addSmartweaveTags(input: {
  interactionInput: InteractionInput;
  tx: Transaction;
}): Transaction {
  console.log(
    '🐘🐘🐘🐘🐘 Interact: 2 (addSmartweaveTags)',
    input.interactionInput
  );

  const { tx, interactionInput } = input;
  const { contract, tags, funcInput } = interactionInput;
  console.log('func Input', input.interactionInput.funcInput);
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', contract);
  tx.addTag('Input', JSON.stringify(funcInput));
  tx.addTag('SDK', 'Warp');

  if (tags)
    tags.map((t) => {
      tx.addTag(t.name, t.value);
    });
  console.log('TX BEFORE WRITE', tx);
  return tx;
}

/**
 * @description Just signs it and returns it.
 *
 * @author @jshaw-ar
 * @param {Transaction} tx
 * @return {*}
 */
function signTx(tx: Transaction) {
  console.log('🐘🐘🐘🐘🐘 Interact: 3 (signTx)');
  const arweave = getArweave();
  arweave.transactions.sign(tx);
  return tx;
}

/**
 * @description Posts the tx to the warp sequencer.
 *
 * @author @jshaw-ar
 * @param {Transaction} tx
 * @return {*}
 */
async function writeInteraction(tx: Transaction) {
  console.log('🐘🐘🐘🐘🐘 Interact: 4 (writeInteraction FINAL)');
  const REDSTONE_GATEWAY = 'https://gateway.redstone.finance';

  const res = await fetch(`${REDSTONE_GATEWAY}/gateway/sequencer/register`, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    console.log('Bad response:', res.status, res.statusText);
    throw new Error(res.statusText);
  }

  const data = await res.json();
  if (!data) {
    console.log(
      'Invalid data received.',
      res.status,
      res.statusText,
      JSON.stringify(data)
    );

    throw new Error('Invalid data received.');
  }
  return data;
}

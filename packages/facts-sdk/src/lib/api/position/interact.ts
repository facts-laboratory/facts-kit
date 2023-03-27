import { pipeWith } from 'ramda';
import Transaction from 'arweave/node/lib/transaction';

import { getArweave } from '@facts-kit/contract-kit';

import { BuyInput, SellInput } from '../interface';

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
  const fn = pipeP([createTx, addSmartweaveTags, signTx, writeInteraction]);
  return fn(input);
}

/**
 * @description Creates the transaction
 *
 * @author mogulx_operates
 * @param {InteractionInput} interactionInput
 * @return {*}
 */
async function createTx(interactionInput: InteractionInput) {
  const arweave = getArweave();
  const tx = await arweave.createTransaction({
    data: 'facts-sdk',
    // reward: "72600854",
    // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
  });
  return { tx, input: interactionInput };
}

/**
 * @description Adds smartweave tags for the tx and any
 * additional tags that are passed to the function
 *
 * @author mogulx_operates
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
}): {
  tx: Transaction;
  input: InteractionInput;
} {
  const { tx, interactionInput } = input;
  const { contract, tags } = input.interactionInput;
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', contract);
  tx.addTag('Input', JSON.stringify(input));
  tx.addTag('SDK', 'Warp');

  if (tags)
    tags.map((t) => {
      tx.addTag(t.name, t.value);
    });
  return { tx, input: interactionInput };
}

/**
 * @description Just signs it and returns it.
 *
 * @author mogulx_operates
 * @param {Transaction} tx
 * @return {*}
 */
function signTx(tx: Transaction) {
  const arweave = getArweave();
  arweave.transactions.sign(tx);
  return tx;
}

/**
 * @description Posts the tx to the warp sequencer.
 *
 * @author mogulx_operates
 * @param {Transaction} tx
 * @return {*}
 */
function writeInteraction(tx: Transaction) {
  // TODO: MOVE TO INDEXER
  // NEEDS TO USE AN ALGORITH TO "RANK" THE ASSERTION
  /**
   * 1. Calculate a "Score" based on oppositionBalances and balances
   * 2. Update position / order in database based on score
   */
  return fetch(`${REDSTONE_GATEWAY}/gateway/sequencer/register`, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

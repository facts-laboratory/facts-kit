/* eslint-disable no-useless-escape */
import { BigNumber } from 'bignumber.js';
import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
export const BAR = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA';
import {
  always,
  compose,
  cond,
  equals,
  T,
  takeLast,
  join,
  split,
  identity,
} from 'ramda';
export const atomicToBar = (atomic: any) =>
  BigNumber.clone({ DECIMAL_PLACES: 6 })(atomic).shiftedBy(-6).toFixed(6);

export async function allow(
  amount: number,
  target: string,
  barContractId: string
) {
  const arweave = getArweave();

  console.log('🐘🐘🐘🐘🐘 Step 3 (allow)', barContractId);
  const tx = await arweave.createTransaction({
    data: Math.random().toString().slice(-4),
  });
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  tx.addTag(
    'Input',
    JSON.stringify({
      function: 'allow',
      target,
      qty: amount,
    })
  );
  tx.addTag('SDK', 'Warp');

  await arweave.transactions.sign(tx);
  const interaction = (await writeInteraction(tx)) as unknown as any;
  return interaction.id;
}

function getHost() {
  return compose(
    cond([
      [equals('gitpod.io'), always('arweave.net')],
      [equals('arweave.dev'), always('arweave.net')],
      [equals('localhost'), always('arweave.net')],
      [T, identity],
    ]),
    join('.'),
    takeLast(2),
    split('.')
  )(location.hostname);
}

export const writeInteraction = async (tx: Transaction) => {
  console.log('🐘🐘🐘🐘🐘 Step 4 (writeInteraction)');
  const WARP_SEQUENCER = 'https://gateway.redstone.finance';

  const res = await fetch(`${WARP_SEQUENCER}/gateway/sequencer/register`, {
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
};

export const readState = async (contract: string) => {
  console.log('🐘🐘🐘🐘🐘 Step 2 (readState)');
  const CACHE = 'https://cache.permapages.app';
  const res = await fetch(`${CACHE}/${contract}`);

  /**
   * Detect 4xx - 5xx errors,
   * res.ok will be false on failure.
   * */
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
};

export const getContent = async (contract: string) => {
  const res = await fetch(
    `https://d1o5nlqr4okus2.cloudfront.net/gateway/contract-data/${contract}`
  );
  /**
   * Detect 4xx - 5xx errors,
   * res.ok will be false on failure.
   * */
  if (!res.ok) {
    console.log('Bad response:', res.status, res.statusText);
    throw new Error(res.statusText);
  }

  const data = await res.json();
  if (!data) {
    throw new Error('Invalid data received.');
  }
  return data;
};

export async function claim(
  claimable: any,
  barContractId: string,
  callback?: any
) {
  const client = getArweave();
  const claim = claimable;
  if (claim) {
    const tx = await client.createTransaction(
      {
        data: Math.random().toString().slice(-4),
        // reward: "72600854",
        // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
      },
      'use_wallet'
    );
    tx.addTag('App-Name', 'SmartWeaveAction');
    tx.addTag('App-Version', '0.3.0');
    tx.addTag('Contract', barContractId);
    const input = {
      function: 'claim',
      txID: claim.txID,
      qty: claim.qty,
    };
    tx.addTag('Input', JSON.stringify(input));
    tx.addTag('SDK', 'Warp');

    await client.transactions.sign(tx);

    await writeInteraction(tx)
      .then((_) => tx.id)
      .then(async (x) => (console.log('claim: ', x), x));
    callback(await readState(barContractId));
  } else {
    alert('You have nothing to claim.');
  }
}
export async function mint(
  reward: number,
  barContractId: string,
  callback?: any
) {
  if (typeof reward !== 'number') throw new Error('not a number');
  const client = getArweave();
  const tx = await client.createTransaction({
    data: Math.random().toString().slice(-4),
    reward: client.ar.arToWinston(reward.toString()),
  });
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  tx.addTag(
    'Input',
    JSON.stringify({
      function: 'mint',
    })
  );
  tx.addTag('SDK', 'Warp');

  await client.transactions.sign(tx);

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then(
      async (x) => (
        callback
          ? callback(await readState(barContractId))
          : console.log('mint: ', x),
        x
      )
    );
}

export async function transfer(
  amount: number,
  target: string,
  barContractId: string,
  callback?: any
) {
  const client = getArweave();
  const tx = await client.createTransaction(
    {
      data: Math.random().toString().slice(-4),
      // reward: "72600854",
      // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
    },
    'use_wallet'
  );
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  const input = JSON.stringify({
    function: 'transfer',
    target: target.trim(),
    qty: amount * 1000000,
  });
  tx.addTag('Input', input);
  tx.addTag('SDK', 'Warp');

  await client.transactions.sign(tx);

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then(
      async (x) => (
        callback
          ? callback(await readState(barContractId))
          : console.log('transferTx: ', x),
        x
      )
    )
    .catch(console.log);
}

/**
 * @description Gets the arweave from either "globalThis" (set this in your test) or "window" (browser)
 * You can pass a custom config.
 *
 * [Test]{@link ./contract-kit.spec.ts}
 * @author @jshaw-ar
 * @export
 * @param {({
 *   host: string;
 *   port: number;
 *   protocol: 'http' | 'https';
 *   timeout: number;
 * })} [config]
 * @return {*}  {Arweave}
 */
export function getArweave(config?: {
  host: string;
  port: number;
  protocol: 'http' | 'https';
  timeout: number;
}): Arweave {
  const arweave =
    (globalThis as unknown as any).Arweave ||
    (window as unknown as any).Arweave;
  const output = arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
    ...config,
  });
  return output;
}

export async function dispatch(tx: Transaction) {
  const wallet = getArweaveWallet();
  const result = await wallet.dispatch(tx);
  return result.id;
}
/**
 * @author @jshaw-ar
 * @export
 * @return {*}  {Arweave}
 */
export function getArweaveWallet(): any {
  const arweaveWallet =
    (globalThis as unknown as any).arweaveWallet ||
    (window as unknown as any).arweaveWallet;

  return arweaveWallet;
}

export async function fetchTxById(tx: string) {
  const response = await fetch(getGraphqlUrl(), {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.8',
      'content-type': 'application/json',
    },
    body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(first: 1, ids: [\\\"${tx}\\\"]) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });

  return getEdges(await response.json())[0].node;
}

export function getEdges(res: any) {
  if (!res?.data?.transactions?.edges) throw new Error('no edges');
  return res.data.transactions.edges;
}

/**
 * Creates the correct fetch url for gql using arweave config.
 *
 * @author @jshaw-ar
 * @param {Config} config
 * @return {*}  {string}
 */
export function getGraphqlUrl() {
  return `https://arweave.net/graphql`;
}

/**
 * @description Gets 'tx' from the query string
 * @todo MOVE TO RENDERER KIT
 * @example getTx(window?.location?.search);
 * @author @mogulx_operates
 * @param {string} queryString
 * @return {*} value of tx or null
 */
export function getTxFromQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  return params.get('tx');
}

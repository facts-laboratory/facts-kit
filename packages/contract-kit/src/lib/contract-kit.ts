import { BigNumber } from 'bignumber.js';
import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';

const REDSTONE_GATEWAY = 'https://gateway.redstone.finance';
// const BAR_CACHE = 'https://bar-cache.onrender.com';
export const BAR = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA';

export const atomicToBar = (atomic: any) =>
  BigNumber.clone({ DECIMAL_PLACES: 6 })(atomic).shiftedBy(-6).toFixed(6);

// export const getBARBalance = async (addr: string, barContractId: string) => {
//   return fetch(`${BAR_CACHE}/${barContractId}`)
//     .then((res) =>
//       res.ok
//         ? res.json()
//         : Promise.reject(new Error('could not get bar balance'))
//     )
//     .then((state) => (state.balances[addr] ? state.balances[addr] : 0))
//     .then(atomicToBar)
//     .then((x) => Number(x).toFixed(4));
// };

export async function allow(
  amount: number,
  target: string,
  arweave: Arweave,
  barContractId: string
) {
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

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then((x) => (console.log('allowTx: ', x), x));
}

function writeInteraction(tx: Transaction) {
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

// const REDSTONE_GATEWAY = 'https://gateway.redstone.finance'

// export const isVouched = async (tx: string) => {
//   // get the state of the vouch contract
//   const state = await readState('_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk');

//   // Return whether or not the tx is vouched
//   return state.vouched[tx] !== undefined;
// };

export const readState = (contract: string) => {
  const CACHE = 'https://cache.permapages.app';
  return fetch(`${CACHE}/${contract}`).then((res) => res.json());
};

export const getContent = (contract: string) => {
  return fetch(
    `https://d1o5nlqr4okus2.cloudfront.net/gateway/contract-data/${contract}`
  );
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
    console.log('INPUT', input);
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
  console.log('INPUT', input);
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

export type PermissionType =
  | 'ACCESS_ADDRESS'
  | 'ACCESS_PUBLIC_KEY'
  | 'ACCESS_ALL_ADDRESSES'
  | 'SIGN_TRANSACTION'
  | 'ENCRYPT'
  | 'DECRYPT'
  | 'SIGNATURE'
  | 'ACCESS_ARWEAVE_CONFIG';
async function connect(name?: string, callback?: any) {
  try {
    const arweaveWallet =
      window.arweaveWallet || window.parent.window.arweaveWallet;
    const addr = arweaveWallet?.getActiveAddress();
    console.log('WALLET', arweaveWallet);
    if (!addr) {
      const permissions = [
        'ACCESS_ADDRESS',
        'ACCESS_ARWEAVE_CONFIG',
        'DISPATCH',
      ] as unknown as PermissionType[];
      await arweaveWallet.connect(permissions, {
        name: name || 'unnamed',
      });
    }
  } catch (e) {
    if (callback) {
      callback();
    } else {
      console.log('Install ArConnect', e);
    }
  }
}

/**
 * Gets the arweave from either "globalThis" (set this in your test) or "window" (browser)
 * You can pass a custom config.
 *
 * [Test]{@link ./contract-kit.spec.ts}
 * @author mogulx_operates
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
 *
 *
 * @author mogulx_operates
 * @export
 * @return {*}  {Arweave}
 */
export function getArweaveWallet(): any {
  const arweaveWallet =
    (globalThis as unknown as any).arweaveWallet ||
    (window as unknown as any).arweaveWallet;

  return arweaveWallet;
}

export function getBundlrClient(): any {
  const Bundlr =
    (globalThis as unknown as any).arweaveWallet ||
    (window as unknown as any).arweaveWallet;

  // return arweaveWallet;
}

/**
 * Adds tags to a transaction
 *
 * @author mogulx_operates
 * @export
 * @param {string} [category]
 * @param {string} [leadStatement]
 * @return {*}  {{ name: string; value: string }[]}
 */
export function addTags(
  topic?: string,
  description?: string
): { name: string; value: string }[] {
  const tags = [];
  if (topic) tags.push({ name: `Topic:${topic}`, value: `${topic}` });
  if (description)
    tags.push({
      name: `Description`,
      value: `${
        description ? description : 'Assertion made on the Permafacts platform.'
      }`,
    });
  return tags;
}

export async function fetchTx(tx: string) {
  const response = await fetch(getUrl(), {
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
 * @author mogulx_operates
 * @param {Config} config
 * @return {*}  {string}
 */
function getUrl() {
  return `https://arweave.net/graphql`;
}
export function parseQuery(queryString: string) {
  const query: any = {};
  const pairs: any = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair: any = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

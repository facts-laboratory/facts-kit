import { getArweave } from '@facts-kit/contract-kit';
import Transaction from 'arweave/node/lib/transaction';
import { Config } from 'arweave/node/common';

/**
 * Gets arweave config and fetches a tx.
 *
 * @author mogulx_operates
 * @export
 * @param {string} tx
 * @return {*}  {Promise<Transaction>}
 */
export async function getTx(tx: string): Promise<Transaction> {
  const arweave = getArweave();
  const output = await fetchTxById(tx, arweave.getConfig());
  return output;
}

/**
 * Runs the fetch for the tx
 *
 * @author mogulx_operates
 * @param {string} tx
 * @param {Config} config
 * @return {*}  {Promise<Transaction>}
 */
async function fetchTxById(tx: string, config: Config): Promise<Transaction> {
  return fetch(getUrl(config), {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.8',
      'content-type': 'application/json',
    },
    body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 1, ids: [\\"${tx}\\"]) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n"}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  }).then(async (res) =>
    res.ok ? getEdges(await res.json()).map(getNode)[0] : Promise.reject(res)
  );
}

/**
 * Pulls the node from the edge of the gql query response.
 *
 * @author mogulx_operates
 * @param {{ node: Transaction }} edge
 * @return {*}  {Transaction}
 */
function getNode(edge: { node: Transaction }): Transaction {
  return edge.node;
}

/**
 * Pulls the edges out of the gql res.
 *
 * @author mogulx_operates
 * @param {{
 *   data: { transactions: { edges: { node: Transaction }[] } };
 * }} res
 * @return {*}  {{ node: Transaction }[]}
 */
function getEdges(res: {
  data: { transactions: { edges: { node: Transaction }[] } };
}): { node: Transaction }[] {
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
function getUrl(config: Config): string {
  return `${config.api.protocol || 'https'}://${
    config.api.host === 'localhost'
      ? `localhost:${config.api.port || 1984}`
      : config.api.host || 'arweave.net'
  }/graphql`;
}

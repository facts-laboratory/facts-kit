/* eslint-disable no-useless-escape */
import { getEdges, getNode } from '@facts-kit/contract-kit';
import { Transaction } from '@facts-kit/faces';

export async function getPlayerRebuttalsIds(
  tx: string
  // TODO: setup cursor func
  // cursor?: string
): Promise<Transaction[]> {
  const res = await fetch('https://arweave.net/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.7',
      'content-type': 'application/json',
    },
    body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 100\\n    owners: [\\\"${tx}\\\"]\\n    tags: [{name: \\\"Permafacts-Type\\\", values: [\\\"Rebuttal\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n\"}`,
    method: 'POST',
  });
  const nodes = getEdges(await res.json()).map(getNode);
  return nodes;
}

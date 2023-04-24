/* eslint-disable no-useless-escape */
import { getEdges, getNode } from '@facts-kit/contract-kit';
import { Transaction } from '@facts-kit/faces';

export async function getFactRebuttals(
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
    body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(first: 30, tags: [{name: \\\"Fact-Rebuts\\\", values: [\\\"${tx}\\\"]}]) {\\n    edges {\\n      node {\\n        block {\\n          timestamp\\n          height\\n        }\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`,
    method: 'POST',
  });
  const edges = getEdges(await res.json()).map(getNode);
  return edges;
}

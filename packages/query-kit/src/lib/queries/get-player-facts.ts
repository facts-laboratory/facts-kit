/* eslint-disable no-useless-escape */
import { Transaction } from '@facts-kit/faces';
import { getEdges, getNode } from '@facts-kit/contract-kit';

export async function getPlayerFacts(
  tx: string,
  cursor?: string
): Promise<Transaction[]> {
  const query = `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 30\\n    owners: [\\\"${tx}\\\"]\\n    tags: [{name: \\\"Permafacts-Version\\\", values: [\\\"Alpha-2\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`;
  const paginate = `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 30\\n    owners: [\\\"${tx}\\\"]\\n    tags: [{name: \\\"Permafacts-Version\\\", values: [\\\"Alpha-2\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`;
  const res = await fetch('https://arweave.net/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.7',
      'content-type': 'application/json',
    },
    body: cursor ? paginate : query,
    method: 'POST',
  });
  const nodes = getEdges(await res.json()).map(getNode);
  return nodes;
}

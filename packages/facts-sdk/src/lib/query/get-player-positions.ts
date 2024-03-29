/* eslint-disable no-useless-escape */
import { Transaction } from '@facts-kit/faces';
import { getEdges } from '@facts-kit/contract-kit';

export async function getPlayerPositions(
  tx: string,
  // this doesnt do anything yet but should paginate
  cursor?: string
): Promise<Transaction[]> {
  const query = `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 6\\n    owners: [\\\"${tx}\\\"]\\n    tags: [{name: \\\"Permafacts-Type\\\", values: [\\\"Position\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`;
  const paginate = `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 6\\n    owners: [\\\"${tx}\\\"]\\n    tags: [{name: \\\"Permafacts-Type\\\", values: [\\\"Position\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`;
  const res = await fetch('https://arweave.net/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.7',
      'content-type': 'application/json',
    },
    body: cursor ? paginate : query,
    method: 'POST',
  });
  const edges = getEdges(await res.json());
  return edges;
}

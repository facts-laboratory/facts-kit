import { Transaction } from '@facts-kit/faces';
import { getEdges } from '@facts-kit/contract-kit';

export default async function main(
  tx: string,
  cursor?: string
): Promise<Transaction[]> {
  const query = `{"operationName":null,"variables":{},"query":"{\\n  transactions(\\n    first: 100\\n    owners: [\\"${tx}\\"]\\n    tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`;
  const paginate = `{"operationName":null,"variables":{},"query":"{\\n  transactions(\\n    first: 100\\n    owners: [\\"${tx}\\"]\\n    tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`;
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

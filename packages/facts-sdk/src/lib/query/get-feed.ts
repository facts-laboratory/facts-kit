/* eslint-disable no-useless-escape */
import { getEdges, getNode } from '@facts-kit/contract-kit';
import { Transaction } from '@facts-kit/faces';

export async function getFeed(
  category?: string | null,
  cursor?: string
): Promise<Transaction[]> {
  const res = category
    ? await fetch('https://arweave.net/graphql', {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=-1.7',
          'content-type': 'application/json',
        },

        body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(\\n    first: 29${
          cursor ? `, after: \\"${cursor}\\"` : ''
        }\\n    tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]\\n  ) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n"}`,
        method: 'POST',
      })
    : await fetch('https://arweave.net/graphql', {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=-1.7',
          'content-type': 'application/json',
        },
        body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(\\n    first: 29${
          cursor ? `, after: \\"${cursor}\\"` : ''
        }\\n    tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]\\n  ) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n"}`,
        method: 'POST',
      });
  const edges = getEdges(await res.json());
  console.log('edges', edges);
  const formattedEdges = edges.map(
    ({ cursor, node }: { cursor: string; node: Transaction }) => ({
      cursor,
      ...node,
    })
  );
  return formattedEdges;
}

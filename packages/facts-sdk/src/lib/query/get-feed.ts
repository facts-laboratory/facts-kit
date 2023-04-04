/* eslint-disable no-useless-escape */
import { getEdges, getNode } from '@facts-kit/contract-kit';
import { Transaction } from '@facts-kit/faces';

export async function getFeed(
  category?: string
  // TODO: setup cursor func
  // cursor?: string
): Promise<Transaction[]> {
  const res = category
    ? await fetch('https://arweave.net/graphql', {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.7',
          'content-type': 'application/json',
        },
        body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 30\\n    tags: [{name: \\\"Topic:${category}\\\", values: [\\\"${category}\\\"]}, {name: \\\"Type\\\", values: [\\\"meme\\\", \\\"fact-post\\\"]}, {name: \\\"Permafacts-Version\\\", values: [\\\"Alpha-2\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n\"}`,
        method: 'POST',
      })
    : await fetch('https://arweave.net/graphql', {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.7',
          'content-type': 'application/json',
        },
        body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(\\n    first: 30\\n    tags: [{name: \\\"Permafacts-Version\\\", values: [\\\"Alpha-2\\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`,
        method: 'POST',
      });
  const edges = getEdges(await res.json()).map(getNode);
  return edges;
}

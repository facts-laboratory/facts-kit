/* eslint-disable no-useless-escape */
import { getEdges, getGraphqlUrl } from '@facts-kit/contract-kit';

export async function fetchAttachedFactMarket(tx: string) {
  const response = await fetch(getGraphqlUrl(), {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.8',
      'content-type': 'application/json',
    },
    body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(\\n    first: 1\\n    tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}, {name: \\"Data-Source\\", values: [\\"${tx}\\"]}]\\n  ) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n"}`,

    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });

  return getEdges(await response.json())[0]?.node;
}

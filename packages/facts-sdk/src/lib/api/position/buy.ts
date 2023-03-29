/* eslint-disable no-useless-escape */
import { BuyInput, State } from '../../faces/state';
import { payFactMarket } from './pay-fact-market';
import { getPrice } from './get-price';
import { interact, pipeP } from './interact';
import { getEdges } from '@facts-kit/contract-kit';

export async function buy(input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  state?: State;
}) {
  const fn = pipeP([getPrice, payFactMarket, interact]);
  return fn(input);
}

export const waitForSec = async (input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  state?: State;
}) => {
  return new Promise((res) => setTimeout(() => res(input), 5500));
};

export const getSequencerTx = async (input: {
  funcInput: Partial<BuyInput>;
  contract: string;
  state?: State;
}) => {
  const { funcInput } = input;
  const { txId } = funcInput;
  console.log('🐘🐘🐘🐘🐘 getSequencerTx', txId);

  const res = await fetch('https://arweave.net/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.8',
      'content-type': 'application/json',
    },
    referrer: 'https://arweave.net/graphql',
    body: `{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  transactions(first: 100, ids: [\\\"${txId}\\\"]) {\\n    edges {\\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}`,
    method: 'POST',
  });

  if (!res.ok) {
    console.log('Bad response:', res.status, res.statusText);
    throw new Error(res.statusText);
  }

  const data = await res.json();
  if (!data) {
    console.log(
      'Invalid data received.',
      res.status,
      res.statusText,
      JSON.stringify(data)
    );

    throw new Error('Invalid data received.');
  }
  const tx = getEdges(data)[0]?.node?.tags?.filter(
    (t: { name: string; value: string }) => t.name === 'Sequencer-Tx-Id'
  )[0]?.value;
  if (!tx) throw new Error('Error fetching sequencer tx.');
  return {
    ...input,
    funcInput: {
      ...input.funcInput,
      txId: tx,
    },
  };
};

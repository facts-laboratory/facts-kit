/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import Async from 'hyper-async';
const { fromPromise, of, Resolved, Rejected } = Async;

export function getPrices(prices) {
  return (
    of(prices)
      // validate
      // side-effect close to edges
      .chain((prices) => {
        if (prices) return Resolved('We have prices');
        return Rejected('no prices');
      })
      .chain((prices) => {
        if (prices) return Resolved('We have prices');
        return Rejected('no prices');
      })
      .chain((prices) => {
        if (prices) return Resolved('We have prices');
        return Rejected('no prices');
      })
      .fork(console.log, (prices) => {
        console.log('prices', prices);
      })
  );
}

export async function getRedstonePrices() {
  const url = 'https://api.redstone.finance/prices?provider=redstone';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Redstone data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

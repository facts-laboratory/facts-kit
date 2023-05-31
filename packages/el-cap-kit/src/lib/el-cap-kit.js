import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { fetchRedstonePrices, fetchRemainingData } from './fetch-prices.js';
import { fetchHistoricalPriceLast24Hours } from './fetch-historical-data.js';

export async function getPrices() {
  return of()
    .chain((input) => fromPromise(fetchRedstonePrices)(input))
    .chain((input) => fromPromise(fetchRemainingData)(input))
    .fork(console.error, (combinedResult) => {
      return combinedResult;
    });
}

export async function get24hPrice(symbol) {
  return of(symbol)
    .chain((symbol, input) =>
      fromPromise(fetchHistoricalPriceLast24Hours)(symbol, input)
    )
    .fork(console.error, (result) => {
      return result;
    });
}

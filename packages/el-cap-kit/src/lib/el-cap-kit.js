import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { fetchRedstonePrices, fetchRemainingData} from './fetch-prices.js';    

export async function getPrices() {
    return (
      of()
        .chain((input) => fromPromise(fetchRedstonePrices)(input))
        .chain((input) => fromPromise(fetchRemainingData)(input))
        .fork(console.error, (combinedResult) => {
          return combinedResult;
        })
    );
  }

  export async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return response;;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


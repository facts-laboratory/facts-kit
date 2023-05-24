import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { extractFirstThreeItems, fetchData, fetchRedstonePrices} from './fetch-prices.js';    

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

  export async function fetchRemainingData(prices) {
    const firstPriceItem = extractFirstThreeItems(prices); 
  
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en';
  
    try {
      const data = await fetchData(url, 'Failed to fetch coin data');
      const secondPriceItem = extractFirstThreeItems(data); 
      const combinedResult = { redstone: firstPriceItem, remaining: secondPriceItem }; 
      return combinedResult;
    } catch (error) {
      return { redstone: firstPriceItem }; // if fetch fails, return the data from fetchRedstonePrices
    }
  }
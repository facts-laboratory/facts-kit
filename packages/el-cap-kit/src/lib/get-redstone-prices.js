import Async from 'hyper-async';
const { fromPromise, of } = Async;

export function getPrices(input) {
  return (
    of(input)
      .chain((input) => fromPromise(getRedstonePrices)(input))
      .map((input) => {
        console.log('Redstone Result:', input);
        return input;
      })
      .chain((input) => fromPromise(fetchRemainingData)(input))
      .fork(console.error, (combinedResult) => {
        console.log('Combined Result:', combinedResult);
      })
  );
}

async function getRedstonePrices() {
  const url = 'https://api.redstone.finance/prices?provider=redstone';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Redstone data');
    }

    const data = await response.json();
  const firstPriceItem = extractFirstItem(data); 

    return firstPriceItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchRemainingData(prices) {
  const firstPriceItem = extractFirstItem(prices); 
  console.log('First Price Item:', firstPriceItem);

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();
    const secondPriceItem = extractFirstItem(data); 
    const combinedResult = { ...firstPriceItem, ...secondPriceItem }; 
    return combinedResult;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function extractFirstItem(obj) {
  const keys = Object.keys(obj);
  if (keys.length > 0) {
    const firstKey = keys[0];
    return { [firstKey]: obj[firstKey] };
  }
  return {};
}
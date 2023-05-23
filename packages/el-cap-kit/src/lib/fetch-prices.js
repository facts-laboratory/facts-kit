
export async function fetchRedstonePrices() {
  const url = 'https://api.redstone.finance/prices?provider=redstone';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Redstone data');
    }

    const data = await response.json();
  const firstPriceItem = extractFirstThreeItems(data); 
  console.log('First Price Item:', firstPriceItem);

    return firstPriceItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRemainingData(prices) {
  const firstPriceItem = extractFirstThreeItems(prices); 
  console.log('First Price Item:', firstPriceItem);

  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();
    const secondPriceItem = extractFirstThreeItems(data); 
    console.log('Second Price Item:', secondPriceItem);
    const combinedResult = { resdstone: firstPriceItem, remaining: secondPriceItem }; 
    return combinedResult;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function extractFirstThreeItems(obj) {
    const keys = Object.keys(obj);
    const result = {};
  
    for (let i = 0; i < 3 && i < keys.length; i++) {
      const key = keys[i];
      result[key] = obj[key];
    }
  
    return result;
  }
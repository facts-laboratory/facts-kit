
  export async function fetchRedstonePrices() {
    const url = 'https://api.redstone.finance/prices?provider=redstone';
    try {
      const data = await fetch(url);
      const firstPriceItem = extractFirstThreeItems(data);
      console.log('First Price Item:', firstPriceItem);
      return firstPriceItem;
    } catch (error) {
      return null;
    }
  }
  
  export async function fetchRemainingData(prices) {
    const firstPriceItem = extractFirstThreeItems(prices); 
  
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en';
  
    try {
      const data = await fetch(url);
      const secondPriceItem = extractFirstThreeItems(data); 
      const combinedResult = { redstone: firstPriceItem, remaining: secondPriceItem }; 
      return combinedResult;
    } catch (error) {
      return { redstone: firstPriceItem }; // if fetch fails, return the data from fetchRedstonePrices
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
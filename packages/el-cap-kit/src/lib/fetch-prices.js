
  export async function fetchRedstonePrices() {
    const url = 'https://api.redstone.finance/prices?provider=redstone';
    try {
      const data = await fetchData(url, 'Failed to fetch Redstone data');
      const firstPriceItem = extractFirstThreeItems(data);
      console.log('First Price Item:', firstPriceItem);
      return firstPriceItem;
    } catch (error) {
      return null;
    }
  }
  


  export async function fetchData(url, errorMessage) {
    console.log('Fetching data from:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
  

export function extractFirstThreeItems(obj) {
    const keys = Object.keys(obj);
    const result = {};
  
    for (let i = 0; i < 3 && i < keys.length; i++) {
      const key = keys[i];
      result[key] = obj[key];
    }
  
    return result;
  }
export async function fetchRemainingData() {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRedstoneData() {
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

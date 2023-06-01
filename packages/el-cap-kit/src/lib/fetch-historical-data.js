import redstone from 'redstone-api';

export const fetchHistoricalPriceLast24Hours = async (symbol) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours

  try {
    const prices = await redstone.getHistoricalPrice(symbol, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      interval: 3600 * 1000, // 1 hour
    });

    const trimmedPrices = trimData(prices);

    return trimmedPrices;
  } catch (err) {
    console.error(`Failed to get historical price data: ${err}`);
    throw err;
  }
};

function trimData(inputArray) {
  let outputArray = inputArray.map((item) => {
    let timestamp = item.timestamp;
    let date = timestamp ? new Date(timestamp) : null;
    let humanReadableTimestamp = date
      ? date.toLocaleString()
      : 'Invalid timestamp';

    return {
      value: item.value,
      timestamp: humanReadableTimestamp,
      originalTimestamp: timestamp,
      symbol: item.symbol,
    };
  });

  return outputArray;
}

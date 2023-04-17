export const FACT_MARKET_SRC = 'ZHXEHvTFbklHB1eV9PFsHc12QZnf09creVHtWZAl64g';

export function getPermafactsTags() {
  return [
    {
      name: 'Permafacts-Type',
      value: `Assertion`,
    },
    { name: 'Permafacts-Version', value: 'Alpha-2' },
    { name: 'Contract-Src', value: FACT_MARKET_SRC },
    { name: 'Content-Type', value: 'text/plain' },
    { name: 'Type', value: 'fact-post' },
  ];
}

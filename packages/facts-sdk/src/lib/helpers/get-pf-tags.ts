export const FACT_MARKET_SRC = 'ZHXEHvTFbklHB1eV9PFsHc12QZnf09creVHtWZAl64g';

export function getPermafactsTags(isRebut?: boolean) {
  return [
    {
      name: 'Permafacts-Type',
      value: isRebut ? 'Rebuttal' : 'Assertion',
    },
    { name: 'Permafacts-Version', value: 'Alpha-2' },
    { name: 'Contract-Src', value: FACT_MARKET_SRC },
    { name: 'Content-Type', value: 'text/plain' },
    { name: 'Type', value: 'fact-post' },
  ];
}

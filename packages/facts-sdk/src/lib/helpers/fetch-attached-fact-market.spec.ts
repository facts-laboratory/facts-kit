import { fetchAttachedFactMarket } from './fetch-attached-fact-market';

describe.skip('fetch attached fact markets', () => {
  it('should fetch 1 transaction (gql node)', async () => {
    const factMarket = await fetchAttachedFactMarket(
      'cbOtLP1GPOgFQgQxQVXiM-fV2rAC1H-QW4b9dJkRVgs'
    );
    expect(factMarket?.id?.length).toBe(43);
  });
});

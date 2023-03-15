import { fetchAttachedFactMarket } from './fetch-attached-fact-market';

// import this if your test uses fetch
import 'isomorphic-fetch';
describe.skip('fetch attached fact markets', () => {
  it.skip('should fetch 1 transaction (gql node)', async () => {
    const factMarket = await fetchAttachedFactMarket(
      'cbOtLP1GPOgFQgQxQVXiM-fV2rAC1H-QW4b9dJkRVgs'
    );
    expect(factMarket?.id?.length).toBe(43);
  });
});

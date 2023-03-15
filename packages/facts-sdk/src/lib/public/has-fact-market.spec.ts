import { hasFactMarket } from './has-fact-market';

// import this if your test uses fetch
import 'isomorphic-fetch';

describe('has fact market', () => {
  it('should work', async () => {
    const factMarket = await hasFactMarket(
      'cbOtLP1GPOgFQgQxQVXiM-fV2rAC1H-QW4b9dJkRVgs'
    );
    console.log(
      `=========================== Fact Market: ${JSON.stringify(factMarket)}`
    );
    expect(factMarket).toEqual({
      tx: 'iatxAyInYgzCF5JPEbLJNZLSom_HHEpdv6daGCUOZ5s',
      link: `https://facts.g8way.io/#/assertion/iatxAyInYgzCF5JPEbLJNZLSom_HHEpdv6daGCUOZ5s`,
    });
  });
  it.skip('should return an undefined transaction.', async () => {
    const factMarket = await hasFactMarket('');
    expect(factMarket.tx).toEqual(undefined);
  });
});

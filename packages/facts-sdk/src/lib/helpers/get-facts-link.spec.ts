import { getFactsLink } from './get-facts-link';

describe.skip('get fact link', () => {
  it('should work', async () => {
    const tx = 'vZmKZjjxw26J7R28RhsN9m5I7FXsS3q63WwT-Qqb6IM';
    const link = await getFactsLink(tx);
    expect(link).toBe(`https://facts.g8way.io/#/assertion/${tx}`);
  });
});

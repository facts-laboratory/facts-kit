import { query } from './query-kit';

describe('query', () => {
  it('should work', async () => {
    const facts = await query(
      'playerFacts',
      '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4'
    );
    console.log('facts', facts);
    expect('query').toEqual('query');
  });
});

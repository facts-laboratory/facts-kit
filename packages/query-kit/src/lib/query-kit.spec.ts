import { getById } from './queries/get-by-id';

describe('query', () => {
  it('should work', async () => {
    const tx = await getById('mYJEzm4D0SZ0gcfPAn4dh2x2ld8_yOKKz4wOHAT6cxg');
    expect(tx[0].block.timestamp).toBeTruthy();
  });
});

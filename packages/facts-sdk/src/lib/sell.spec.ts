import { sell } from './sell';
describe.skip('sell', () => {
  it.skip('should work', async () => {
    (globalThis as any).warp = {};
    expect(await sell()).toEqual('sell');
  });
});

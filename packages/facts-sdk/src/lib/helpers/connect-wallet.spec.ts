import { connectArweaveWallet } from './connect-wallet';

describe.skip('connect wallet', () => {
  it('should connect arweave wallet', async () => {
    const connect = connectArweaveWallet({});
    expect(connect).toThrow();
  });
});

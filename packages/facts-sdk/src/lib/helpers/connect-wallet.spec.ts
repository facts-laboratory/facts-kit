import { connectArweaveWallet } from './connect-wallet';

describe('connect wallet', () => {
  it('should connect arweave wallet', async () => {
    const connect = connectArweaveWallet({});
    expect(connect).toThrow();
  });
});

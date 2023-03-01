import { getArweave } from './contract-kit';
import Arweave from 'arweave';

describe('contractKit', () => {
  beforeAll(() => {
    // Setup so our arweave function can access Arweave in a node runtime.
    (globalThis as any).Arweave = Arweave;
  });
  it('getArweave should return localhost as host', () => {
    const arweave = getArweave({
      host: 'localhost',
      port: 1984,
      protocol: 'http',
      timeout: 10000,
    });
    arweave.api.post;
    const config = arweave.getConfig();
    expect(config.api.host).toEqual('localhost');
  });
  it('getArweave should return arweave.net as host', () => {
    const arweave = getArweave();
    const config = arweave.getConfig();
    expect(config.api.host).toEqual('arweave.net');
  });
});

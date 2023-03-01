import { getTx } from './get-tx';
import Arweave from 'arweave';

// import this if your test uses fetch
import 'isomorphic-fetch';

describe.skip('get tx', () => {
  beforeAll(() => {
    // Setup so our arweave function can access Arweave in a node runtime.
    (globalThis as any).Arweave = Arweave;
  });
  it('should query a tx', async () => {
    const tx = await getTx('vZmKZjjxw26J7R28RhsN9m5I7FXsS3q63WwT-Qqb6IM');
    expect(tx.id).toBeTruthy();
  });
});

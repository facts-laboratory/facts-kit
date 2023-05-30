import { getTx } from './get-tx';
import Arweave from 'arweave';

describe('TODO: create a test if it is needed. i dont see a big reason on this one at this date.', () => {
  beforeAll(() => {
    // Setup so our arweave function can access Arweave in a node runtime.
    (globalThis as any).Arweave = Arweave;
  });
  it('should query a tx', async () => {
    const tx = await getTx('vZmKZjjxw26J7R28RhsN9m5I7FXsS3q63WwT-Qqb6IM');
    expect(tx.id).toBeTruthy();
  });
});

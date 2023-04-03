import { setupGlobals } from '../../mock/setup-globals';
import { setupBundlr } from '../../mock/setup-bundlr';
import { deployAtomicFactMarket } from './atomic-fact-market';

vi.mock('../common/bundlr', () => {
  const originalModule = vi.importActual('../common/bundlr');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getBundlrClient: vi.fn(async () => setupBundlr()),
  };
});

describe.skip('atomic-fact-market', () => {
  beforeAll(async () => {
    await setupGlobals();
  });
  it.skip('should create a fact market - arweaveWallet', async () => {
    const tx = await deployAtomicFactMarket({
      position: 'oppose',
      use: 'arweaveWallet',
      data: { test: 'data' },
      tags: {
        type: 'fact-post',
        title: 'Test title',
        description: 'test description',
        topics: ['topic-1', 'topic-2'],
      },
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
  it.skip('should create a fact market - bundlr', async () => {
    const tx = await deployAtomicFactMarket({
      use: 'bundlr',
      data: { test: 'data' },
      tags: {
        type: 'fact-post',
        title: 'Test title',
        description: 'test description',
        topics: ['topic-1', 'topic-2'],
      },
      position: 'support',
    });
    console.log(`bundlr id: ${JSON.stringify(tx)}`);
    expect(tx).toEqual({
      tx: '<bundlr-tx>',
    });
  });
  it.skip('should create a fact market - warp', async () => {
    const tx = await deployAtomicFactMarket({
      use: 'warp',
      data: { test: 'data' },
      tags: {
        type: 'fact-post',
        title: 'Test title',
        description: 'test description',
        topics: ['topic-1', 'topic-2'],
      },
      position: 'oppose',
    });
    expect(tx).toEqual({ tx: '<contractTxId>' });
  });
  it('should create a fact market - arweaveWallet', async () => {
    const factMarket = await deployAtomicFactMarket({
      use: 'arweaveWallet',
      data: { test: 'data' }, // You define the shape of this -- i twill be stringified
      tags: {
        type: 'fact-post',
        title: 'Test title',
        description: 'test description',
        topics: ['topic-1', 'topic-2'],
      },
      position: 'support',
    });
    expect(factMarket).toEqual({ tx: '<tx-id>' });
  });
});

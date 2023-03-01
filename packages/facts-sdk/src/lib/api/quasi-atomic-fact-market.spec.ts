import { setupGlobals } from '../mock/setup-globals';
import { setupBundlr } from '../mock/setup-bundlr';
import { attachFactMarket } from './quasi-atomic-fact-market';

vi.mock('../common/bundlr', () => {
  const originalModule = vi.importActual('../common/bundlr');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getBundlrClient: vi.fn(async () => setupBundlr()),
  };
});

describe('quasi-atomic-fact-market', () => {
  beforeAll(async () => {
    await setupGlobals();
  });
  it('should create a fact market', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
  it('should create a fact market - bundlr', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
      use: 'bundlr',
    });
    console.log(`bundlr id: ${JSON.stringify(tx)}`);
    expect(tx).toEqual({
      tx: '<bundlr-tx>',
    });
  });
  it.skip('should create a fact market - warp', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
      use: 'warp',
    });
    expect(tx).toEqual({ tx: '' });
  });
  it('should create a fact market - arweaveWallet', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
      use: 'arweaveWallet',
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
});

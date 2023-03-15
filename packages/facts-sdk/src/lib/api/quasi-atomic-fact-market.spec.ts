import { setupGlobals } from '../mock/setup-globals';
import { setupBundlr } from '../mock/setup-bundlr';
import { attachFactMarket } from './quasi-atomic-fact-market';

vi.mock('../common/bundlr', () => {
  const originalModule = vi.importActual('../common/bundlr');

  return {
    __esModule: true,
    ...originalModule,
    getBundlrClient: vi.fn(async () => setupBundlr()),
  };
});

describe.skip('quasi-atomic-fact-market', () => {
  beforeAll(async () => {
    await setupGlobals();
  });
  it.skip('should create a fact market', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      position: 'oppose',
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
  it.skip('should create a fact market - bundlr', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      use: 'bundlr',
      position: 'support',
    });
    console.log(`bundlr id: ${JSON.stringify(tx)}`);
    expect(tx).toEqual({
      tx: '<bundlr-tx>',
    });
  });
  it.skip('should create a fact market - warp', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      use: 'warp',
      position: 'oppose',
    });
    expect(tx).toEqual({ tx: '<contractTxId>' });
  });
  it('should create a fact market - arweaveWallet', async () => {
    const tx = await attachFactMarket({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      use: 'arweaveWallet',
      position: 'support',
    });
    console.log('TX', tx);
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
});

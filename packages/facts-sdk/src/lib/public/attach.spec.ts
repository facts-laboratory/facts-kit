import { setupGlobals } from './../mock/setup-globals';
import { setupBundlr } from './../mock/setup-bundlr';
import { attach } from './attach';

vi.mock('./common/bundlr', () => {
  const originalModule = vi.importActual('./common/bundlr');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getBundlrClient: vi.fn(async () => setupBundlr()),
  };
});

describe('attach', () => {
  beforeAll(async () => {
    await setupGlobals();
  });
  it.skip('should create a fact market', async () => {
    const tx = await attach({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      position: 'support',
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
  it.skip('should create a fact market - bundlr', async () => {
    const tx = await attach({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      use: 'bundlr',
      position: 'support',
    });
    console.log(`bundlr id: ${tx}`);
    expect((tx as { tx: string })?.tx?.length).toEqual(43);
  });
  it.skip('should create a fact market - warp', async () => {
    const tx = await attach({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      position: 'support',
    });
    expect(tx).toEqual({ tx: '' });
  });
  it('should create a fact market - arweaveWallet', async () => {
    const tx = await attach({
      tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
      position: 'support',
      use: 'arweaveWallet',
    });
    expect(tx).toEqual({ tx: '<tx-id>' });
  });
});

import { deployAtomicFactMarket } from './atomic-fact-market';
import { setupGlobals } from '../mock/setup-globals';
import { setupBundlr } from '../mock/setup-bundlr';

vi.mock('../common/bundlr', () => {
  const originalModule = vi.importActual('../common/bundlr');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getBundlrClient: vi.fn(async () => setupBundlr()),
  };
});

const assertion = {
  content: [
    {
      type: 'h1',
      __source: {
        fileName:
          '/Users/jshaw/workbench/arweave/permafacts/libs/components/src/lib/assert/common/basicMarksValue.tsx',
        lineNumber: 10,
        columnNumber: 5,
      },
      children: [
        {
          text: 'THIS IS A SPECIAL ONE',
          __source: {
            fileName:
              '/Users/jshaw/workbench/arweave/permafacts/libs/components/src/lib/assert/common/basicMarksValue.tsx',
            lineNumber: 11,
            columnNumber: 7,
          },
        },
      ],
    },
    { type: 'p', children: [{ text: 'test' }] },
    {
      type: 'p',
      __source: {
        fileName:
          '/Users/jshaw/workbench/arweave/permafacts/libs/components/src/lib/assert/common/basicMarksValue.tsx',
        lineNumber: 13,
        columnNumber: 5,
      },
      children: [
        {
          text: '',
          __source: {
            fileName:
              '/Users/jshaw/workbench/arweave/permafacts/libs/components/src/lib/assert/common/basicMarksValue.tsx',
            lineNumber: 14,
            columnNumber: 7,
          },
        },
      ],
    },
  ],
  timestamp: 1676824206,
};
describe.skip('create-tx', () => {
  beforeAll(async () => {
    await setupGlobals();
  });

  it('should work query a tx', async () => {
    (globalThis as any).warp = {};
    const factMarket = await deployAtomicFactMarket({
      data: assertion,
      description: 'Testing assertion from facts-sdk',
      owner: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
      title: 'Testing assertion from facts-sdk',
      rebutTx: 'vZmKZjjxw26J7R28RhsN9m5I7FXsS3q63WwT-Qqb6IM',
      topic: 'technology',
    });
    expect('facts-sdk').toEqual('facts-sdk');
    // expect(factMarket.tx).toEqual('facts-sdk');
  });
});

import * as warp from 'warp-contracts';
import { FromSrcTxContractData } from 'warp-contracts';

export function setupWarp() {
  if (process.env.ENVIRONMENT === 'test') {
    (globalThis as any).warp = warp;

    // Sets warp to the real warp library.
    return;
  }

  //
  (globalThis as any).warp = {
    WarpFactory: {
      forMainnet: () => {
        return {
          register: (tx: string, node: 'node1' | 'node2') => {
            console.log(`register -- of tx ${tx} on bundlr ${node}.`);
          },
          deployFromSourceTx: (
            input: FromSrcTxContractData,
            disableBundling?: boolean
          ) => {
            console.log(
              `deployFromSourceTx -- using tx ${input.srcTxId}. disableBundling: ${disableBundling}`
            );
            return {
              contractTxId: '<contractTxId>',
            };
          },
        };
      },
    },
  };
}

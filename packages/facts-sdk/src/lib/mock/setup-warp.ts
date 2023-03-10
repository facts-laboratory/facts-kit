import { FromSrcTxContractData } from 'warp-contracts';
import { httpRegister } from '../common/warp';

export function setupWarp() {
  (globalThis as any).warp = {
    WarpFactory: {
      forMainnet: () => {
        return {
          register: (tx: string, node: 'node1' | 'node2') => {
            console.log(`register -- of tx ${tx} on bundlr ${node}.`);
          },
          httpRegister: async (tx: string) => {
            return await httpRegister(tx);
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

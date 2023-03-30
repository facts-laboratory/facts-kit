import fs from 'fs';
import { FromSrcTxContractData, WarpFactory } from 'warp-contracts';

export function setupWarp() {
  if (!process.env['PATH_TO_WALLET']) throw new Error('Broken...');
  const jwk = JSON.parse(
    fs.readFileSync(process.env['PATH_TO_WALLET']).toString()
  );
  const CACHE = 'https://cache.permapages.app';
  const client = WarpFactory.forMainnet();
  (globalThis as any).warp = {
    WarpFactory: {
      forMainnet: () => {
        return {
          contract: (tx: string) => {
            return {
              syncState: async () => {
                console.log('Mock syncState');
              },
              connect: (input: string) => {
                console.log('Mock connect', tx);

                return {
                  setEvaluationOptions: (input: any) => {
                    console.log('Evaluation options set.');
                    return {
                      writeInteraction: async (input: any) => {
                        console.log('Writing interaction.');
                        const contract = await client
                          .contract(tx)
                          .syncState(CACHE + '/contract', { validity: true });
                        contract.connect(jwk).setEvaluationOptions({
                          internalWrites: true,
                        });

                        const interaction = await contract.writeInteraction(
                          input
                        );
                        return interaction;
                      },
                      readState: async () => {
                        return (
                          await client
                            .contract(tx)
                            .syncState(CACHE + '/contract', { validity: true })
                        )
                          .readState()
                          .then((o) => o)
                          .catch((e) => console.error('ERROR'));
                      },
                    };
                  },
                };
              },
            };
          },
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

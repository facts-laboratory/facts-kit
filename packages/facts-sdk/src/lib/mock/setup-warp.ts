import fs from 'fs';
import { FromSrcTxContractData, WarpFactory } from 'warp-contracts';

export function setupWarp() {
  if (!process.env['PATH_TO_WALLET']) throw new Error('Broken...');
  const jwk = JSON.parse(
    fs.readFileSync(process.env['PATH_TO_WALLET']).toString()
  );

  (globalThis as any).warp = {
    WarpFactory: {
      forMainnet: () => {
        return {
          contract: (tx: string) => {
            const CACHE = 'https://cache.permapages.app';
            const client = WarpFactory.forMainnet();
            return {
              syncState: async () => {
                const contract = await client
                  .contract(tx)
                  .syncState(CACHE + '/contract', { validity: true });
                return contract;
              },
              connect: (input: string) => {
                console.log('CONNECT TX', tx);
                const contract = client
                  .contract(tx)
                  .connect(jwk)
                  .setEvaluationOptions({
                    internalWrites: true,
                  });
                return {
                  setEvaluationOptions: (input: any) => {
                    console.log('Evaluation options set.', input);
                    return {
                      writeInteraction: async (input: any) => {
                        console.log('=============== Interacting', input);
                        console.log('CONFIG', client.arweave.api.getConfig());
                        const interaction = await contract.writeInteraction(
                          input
                        );
                        console.log('DONE');
                        return interaction;
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

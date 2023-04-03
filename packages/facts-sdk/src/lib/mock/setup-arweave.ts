import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
import fs from 'fs';

export function setupArweave() {
  if (!process.env['PATH_TO_WALLET'])
    throw new Error(
      'Set the env var PATH_TO_WALLET to ~/path/to/your/wallet.json'
    );

  // load the JWK wallet key file from disk
  const jwk = JSON.parse(
    fs.readFileSync(process.env['PATH_TO_WALLET'] || '').toString()
  );

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
  });

  (globalThis as any).Arweave = {
    init: (input: any) => ({
      createTransaction: async (input: any) => {
        const tx = await await arweave.createTransaction(
          {
            data: Math.random().toString().slice(-4),
            // reward: "72600854",
            // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
          },
          jwk
        );
        return tx;
      },
      transactions: {
        sign: async (tx: Transaction) => {
          return await arweave.transactions.sign(tx, jwk);
        },
      },
      getConfig: () => ({
        api: {
          host: 'arweave.net',
        },
      }),
    }),
  };
}

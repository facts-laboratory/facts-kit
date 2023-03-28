/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';
import fs from 'fs';

export function setupArweave() {
  console.log('============ SETTING UP ARWEAVE');
  if (!process.env['PATH_TO_WALLET'])
    throw new Error(
      'Set the env var PATH_TO_WALLET to ~/path/to/your/wallet.json'
    );

  // load the JWK wallet key file from disk
  const key = JSON.parse(
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
      createTransaction: async (input: any) =>
        await arweave.createTransaction({ data: 'facts-sdk' }, key),
      transactions: {
        sign: async (tx: Transaction) => {
          console.log('=============== ARWEAVE SIGN', tx.owner);
          return await arweave.transactions.sign(tx, key);
        },
      },
    }),
  };
}

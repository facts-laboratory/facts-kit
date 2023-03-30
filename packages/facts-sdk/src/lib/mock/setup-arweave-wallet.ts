import Arweave from 'arweave';
import fs from 'fs';
import Transaction from 'arweave/node/lib/transaction';

export async function setupArweaveWallet() {
  const jwk = JSON.parse(
    fs.readFileSync(process.env['PATH_TO_WALLET'] || '').toString()
  );

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
  });

  const arweaveWallet = {
    dispatch: async (tx: Transaction) => {
      console.log(`dispatch -- ${JSON.stringify(tx.last_tx)}`);
      return { id: `<tx-id>` };
    },
    sign: async (tx: Transaction) => {
      return await arweave.transactions.sign(tx, jwk);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connect: async (permissions: any, obj: any) => {
      return;
    },
    disconnect: async () => {
      return;
    },
    getActiveAddress: async () => {
      return '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4';
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).arweaveWallet = arweaveWallet;
}

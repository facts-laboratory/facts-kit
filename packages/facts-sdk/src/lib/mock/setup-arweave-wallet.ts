import Transaction from 'arweave/node/lib/transaction';

export async function setupArweaveWallet() {
  const arweaveWallet = {
    dispatch: async (tx: Transaction) => {
      console.log(`dispatch -- ${JSON.stringify(tx.last_tx)}`);
      return { id: `<tx-id>` };
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

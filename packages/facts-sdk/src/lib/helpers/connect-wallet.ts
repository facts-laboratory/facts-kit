export async function connectArweaveWallet(wallet: any) {
  await wallet.disconnect();
  await wallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'DISPATCH'], {
    name: 'facts-sdk',
  });
}

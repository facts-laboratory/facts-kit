import Transaction from 'arweave/node/lib/transaction';
const WARP_GATEWAY = 'https://gateway.warp.cc';

export function getWarpFactory() {
  return globalThis
    ? (globalThis as unknown as any).warp.WarpFactory.forMainnet()
    : (window as unknown as any).warp.WarpFactory.forMainnet();
}

export type PermissionType =
  | 'ACCESS_ADDRESS'
  | 'ACCESS_PUBLIC_KEY'
  | 'ACCESS_ALL_ADDRESSES'
  | 'SIGN_TRANSACTION'
  | 'ENCRYPT'
  | 'DECRYPT'
  | 'SIGNATURE'
  | 'ACCESS_ARWEAVE_CONFIG';
export async function connect() {
  const permissions = [
    'ACCESS_ADDRESS',
    'ACCESS_ARWEAVE_CONFIG',
    'DISPATCH',
  ] as unknown as PermissionType[];
  await window.arweaveWallet.connect(permissions);
}

export async function register(tx: string) {
  const warp = getWarpFactory();
  await warp.register(tx, 'node2');
  return tx;
}

export async function httpRegister(tx: string) {
  const REDSTONE_GATEWAY = 'https://gateway.redstone.finance';

  return fetch(`${REDSTONE_GATEWAY}/gateway/contracts/register`, {
    method: 'POST',
    body: JSON.stringify({ contractId: tx, bundlrNode: 'node2' }),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      console.log('REGISTER RES =================', res.statusText, res.status);
    })
    .catch((e) => console.log('REGISTER ERR =================', e));
  // .then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

export function writeInteraction(tx: Transaction) {
  return fetch(`${WARP_GATEWAY}/gateway/sequencer/register`, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

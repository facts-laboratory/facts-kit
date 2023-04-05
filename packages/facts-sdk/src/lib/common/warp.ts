import { DeployPlugin } from 'warp-contracts-plugin-deploy';
import Transaction from 'arweave/node/lib/transaction';
const WARP_SEQUENCER = 'https://gateway.warp.cc';

export function getWarpFactory() {
  // if (process?.env['IS_LOCAL'] === 'true') {
  //   return (globalThis as any)?.warp.WarpFactory.forMainnet();
  // }

  if ((window as any)?.warp) {
    return (window as any)?.warp.WarpFactory.forMainnet().use(
      new DeployPlugin()
    );
  }
  return fetch(
    'https://5t6kvshi7ih6e572itxnml4tlxw6qzakb3fpw67ibjcyuvfp6poq.arweave.net/7PyqyOj6D-J3-kTu1i-TXe3oZAoOyvt76ApFilSv890/warp.js'
  )
    .then((response) => response.text())
    .then((text) => {
      const script = document.createElement('script');
      script.textContent = text;
      document.body.appendChild(script);
      console.log('Warp loaded. Using DeployPlugin');
      return (window as any)?.warp.WarpFactory.forMainnet().use(
        new DeployPlugin()
      );
    })
    .catch((error) => console.error(error));
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
  const warp = await getWarpFactory();
  await warp.register(tx, 'node2');
  return tx;
}

export async function httpRegister(tx: string) {
  const res = await fetch(
    `https://gateway.warp.cc/gateway/contracts/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ contractId: tx, bundlrNode: 'node2' }),
    }
  );
  console.log('res', res);
}

export function writeInteraction(tx: Transaction) {
  return fetch(`${WARP_SEQUENCER}/gateway/sequencer/register`, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

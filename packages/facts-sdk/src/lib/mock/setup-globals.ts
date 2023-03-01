import { setupArweave } from './setup-arweave';
import { setupArweaveWallet } from './setup-arweave-wallet';
import { setupWarp } from './setup-warp';

export function setupGlobals() {
  setupArweaveWallet().then(setupArweave).then(setupWarp);
}

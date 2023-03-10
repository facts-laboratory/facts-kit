import { setupArweave } from './setup-arweave';
import { setupArweaveWallet } from './setup-arweave-wallet';
import { setupWarp } from './setup-warp';

export function setupGlobals() {
  process.env['ENVIRONMENT'] = 'test';
  setupArweaveWallet().then(setupArweave).then(setupWarp);
}

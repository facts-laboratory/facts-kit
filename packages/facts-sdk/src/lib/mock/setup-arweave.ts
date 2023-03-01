import Arweave from 'arweave';

export function setupArweave() {
  (globalThis as any).Arweave = Arweave;
}

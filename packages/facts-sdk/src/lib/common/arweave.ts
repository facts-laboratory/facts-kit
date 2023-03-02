import Arweave from 'arweave';

export function getArweave() {
  return process?.env['NODE_ENV'] === 'test'
    ? Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http',
      })
    : Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 60000,
      });
}

import { ethers } from 'ethers';

export async function getBundlrClient() {
  const Bundlr = (window as unknown as any).Bundlr;
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    console.log('MetaMask not installed.');
    throw new Error(`Metamask isn't installed.`);
  } else {
    await (window as any).ethereum.enable();
    const bundlr = new Bundlr.default(
      'http://node2.bundlr.network',
      'matic',
      new ethers.providers.Web3Provider(ethereum)
    );
    await bundlr.ready();
    return bundlr;
  }
}

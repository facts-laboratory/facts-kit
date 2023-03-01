import * as Bundlr from '@bundlr-network/client';
import fs from 'fs';

export function setupBundlr() {
  if (process.env['ENVIRONMENT'] === 'test') {
    const jwk = JSON.parse(
      fs.readFileSync(process.env['PATH_TO_WALLET'] as string).toString()
    );

    console.log('ABOUT TO DO IT============');
    // TODO: setup a way to just mock this locally
    return new Bundlr.default('http://node2.bundlr.network', 'arweave', jwk);
  }
  return {
    upload: (data: any, obj: any) => ({ id: '<bundlr-tx>' }),
  };
}

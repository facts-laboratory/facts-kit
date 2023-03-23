import {
  dispatch,
  getArweave,
  getArweaveWallet,
} from '@facts-kit/contract-kit';
import { getBundlrClient } from '../common/bundlr';
import { getWarpFactory, register } from '../common/warp';
import { Use } from '../faces/assert';
import { connectArweaveWallet } from '../helpers/connect-wallet';
import { getAns110Tags } from '../helpers/get-ans110-tags';
import { FACT_MARKET_SRC, getPermafactsTags } from '../helpers/get-pf-tags';
import { getSmartweaveTags } from '../helpers/get-smartweave-tags';
import { getTx } from '../helpers/get-tx';
import { initialState } from './interface';

export interface DeployFactMarketInput {
  tags: { name: string; value: string }[];
  attachTo: string;
  rebutTx?: string;
  use?: Use;
  useConnectedWallet?: boolean;
  position: 'support' | 'oppose';
}

/**
 *
 * @author @mogulx_operates
 * @param {DeployFactMarketInput} input
 * @return {*}  {Promise<string>}
 */
async function deployFactMarket(input: DeployFactMarketInput): Promise<string> {
  const { use } = input;
  switch (use) {
    case 'arweaveWallet':
    case undefined:
      return deployWithArweaveWallet(input);
    case 'warp':
      return deployWithWarp(input);
    case 'bundlr':
      return deployWithBundlr(input);
    default:
      throw new Error(`Wallet ${use} not supported.`);
  }
}

/**
 *
 * @author mogulx_operates
 * @param {DeployFactMarketInput} input
 * @return {*}
 */
async function deployWithBundlr(input: DeployFactMarketInput) {
  const { tags, rebutTx, attachTo, position } = input;
  const newTags = [
    ...tags,
    { name: 'Data-Source', value: attachTo },
    { name: 'Protocol-Name', value: 'Facts' },
    { name: 'Render-With', value: `${'facts-card-renderer'}` },
    {
      name: 'Init-State',
      value: JSON.stringify({
        ...initialState,
        name: `${
          tags.filter((t) => t.name === 'Title')[0]?.value || 'No title.'
        }`,
        creator: 'TODO',
        position,
      }),
    },
  ];
  if (rebutTx) tags.push({ name: 'Fact-Rebuts', value: rebutTx });

  const bundlr = await getBundlrClient();
  const tx = await bundlr.upload(JSON.stringify({ facts: 'sdk' }), {
    tags: newTags,
  });

  if (!tx.id) {
    throw new Error('Failed to deploy assertion.');
  }
  await register(tx.id);
  return tx.id;
}

/**
 * @author mogulx_operates
 * @param {DeployFactMarketInput} input
 * @return {*}
 */
async function deployWithWarp(input: DeployFactMarketInput) {
  const { tags, rebutTx, attachTo, position } = input;

  const newTags = [
    ...tags,
    { name: 'Data-Source', value: attachTo },
    { name: 'Protocol-Name', value: 'Facts' },
    { name: 'Render-With', value: `${'facts-card-renderer'}` },
  ];
  if (rebutTx) tags.push({ name: 'Fact-Rebuts', value: rebutTx });

  const warp = getWarpFactory();
  const factMarket = await warp.deployFromSourceTx(
    {
      initState: JSON.stringify({
        ...initialState,
        name: `${
          tags.filter((t) => t.name === 'Title')[0]?.value || 'No title.'
        }`,
        creator: 'TODO',
        position,
      }),
      srcTxId: FACT_MARKET_SRC,
      wallet: 'use_wallet',
      data: {
        'Content-Type': 'text/plain',
        body: JSON.stringify({ facts: 'sdk' }),
      },
      newTags,
    },
    false
  );
  if (!factMarket.contractTxId) {
    throw new Error('Failed to deploy assertion.');
  }

  return factMarket.contractTxId;
}

async function deployWithArweaveWallet(
  input: DeployFactMarketInput
): Promise<string> {
  const wallet = getArweaveWallet();
  const { tags, attachTo, rebutTx, position, useConnectedWallet } = input;

  const arweave = getArweave();
  const tx = await arweave.createTransaction({
    data: JSON.stringify({ facts: 'sdk' }),
  });
  tags.forEach((t) => tx.addTag(t.name, t.value));
  if (rebutTx) tx.addTag('Fact-Rebuts', rebutTx);
  tx.addTag('Render-With', `${'facts-card-renderer'}`);
  tx.addTag('Data-Source', attachTo);
  tx.addTag('Protocol-Name', 'Facts');

  if (!wallet) throw new Error('Unable to find arweave wallet.');
  /**
   * URGENT!
   * Move this out of here because it will be used in multiple places
   */
  if (!useConnectedWallet) {
    await connectArweaveWallet(wallet);
  }

  const creator = await wallet.getActiveAddress();
  tx.addTag(
    'Init-State',
    JSON.stringify({
      ...initialState,
      name:
        tags.filter((t) => t.name === 'Title')[0]?.value || 'bug: no title.',
      creator,
      position,
    })
  );

  const id = await dispatch(tx);
  console.log(`Transaction id: ${id}`);
  return register(id).then((tx) => tx);
}

export interface AttachFactMarketInput {
  tx: string;
  rebutTx?: string;
  use?: Use;
  position: 'support' | 'oppose';
  useConnectedWallet?: boolean;
}
export async function attachFactMarket(
  input: AttachFactMarketInput
): Promise<{ tx: string } | { error: string }> {
  try {
    const { tx } = input;
    const transaction = await getTx(tx);
    const ans110tags = getAns110Tags(transaction?.tags);
    const factMarketTx = await deployFactMarket({
      tags: [...ans110tags, ...getSmartweaveTags(), ...getPermafactsTags()],
      attachTo: tx,
      ...input,
    });
    return { tx: factMarketTx };
  } catch (e: any) {
    console.log(e);
    return {
      error: e.message,
    };
  }
}

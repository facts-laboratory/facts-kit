import {
  dispatch,
  getArweave,
  getArweaveWallet,
} from '@facts-kit/contract-kit';
import { getBundlrClient } from '../../common/bundlr';
import { getWarpFactory, register } from '../../common/warp';
import { DeployAtomicFactMarketInput, Use } from '../../faces/assert';
import { FACT_MARKET_SRC, getPermafactsTags } from '../../helpers/get-pf-tags';
import { getSmartweaveTags } from '../../helpers/get-smartweave-tags';
import { initialState } from '../../faces';

export interface DeployFactMarketInput {
  tags: { name: string; value: string }[];
  rebutTx?: string;
  use?: Use;
  position: 'support' | 'oppose';
  data: any;
}

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

async function deployWithBundlr(input: DeployFactMarketInput) {
  const { tags, rebutTx, position } = input;
  const newTags = [
    ...tags,
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
async function deployWithWarp(input: DeployFactMarketInput) {
  const { tags, rebutTx, position } = input;

  const newTags = [
    ...tags,
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
  const { tags, rebutTx, position, data } = input;

  const arweave = getArweave();
  const tx = await arweave.createTransaction({
    data: JSON.stringify(data),
  });
  tags.forEach((t) => tx.addTag(t.name, t.value));
  if (rebutTx) tx.addTag('Fact-Rebuts', rebutTx);
  tx.addTag('Render-With', `${'facts-card-renderer'}`);
  // tx.addTag('Data-Source', attachTo);
  tx.addTag('Protocol-Name', 'Facts');

  if (!wallet) throw new Error('Unable to find arweave wallet.');
  await wallet.disconnect();
  await wallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'DISPATCH'], {
    name: 'facts-sdk',
  });
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

export interface ANS110Tags {
  topics?: string[];
  type: string;
  title: string;
  description: string;
}

export async function deployAtomicFactMarket(
  input: DeployAtomicFactMarketInput
): Promise<{ tx: string } | { error: string }> {
  const { tags, data, position, rebutTx, use } = input;
  try {
    const factMarketTx = await deployFactMarket({
      tags: [
        ...getAns110TagsFromUser(tags),
        ...getSmartweaveTags(),
        ...getPermafactsTags(),
      ],
      data,
      position,
      rebutTx,
      use,
    });
    return { tx: factMarketTx };
  } catch (e: any) {
    console.log(e);
    return {
      error: e.message,
    };
  }
}

function getAns110TagsFromUser(tags: ANS110Tags) {
  const topics: { name: string; value: string }[] = [];
  if (tags.topics) {
    tags?.topics?.forEach((t) => {
      topics.push({ name: `Topic:${t}`, value: t });
    });
  }
  return [
    { name: 'Type', value: tags.type },
    { name: 'Title', value: tags.title },
    { name: 'Description', value: tags.description },
    ...topics,
  ];
}

import { initialState } from './interface';
import { register } from '../common/warp';
import {
  addTags,
  getArweave,
  getArweaveWallet,
  isVouched,
} from '@facts-kit/contract-kit';

/**
 *
 * @author mogulx_operates
 * @export
 * @interface DeployAtomicFactMarketInput
 */
export interface DeployAtomicFactMarketInput {
  title: string;
  owner: string;
  data: any;
  topic?: string;
  description: string;
  rebutTx?: string;
}

/**
 * Deploys a fact market with atomic data
 *
 * @author mogulx_operates
 * @export
 * @param {DeployAtomicFactMarketInput} input
 * @return {*}  {Promise<{ tx: string }>}
 */
export async function deployAtomicFactMarket(
  input: DeployAtomicFactMarketInput
): Promise<{ tx: string }> {
  const { title, owner, data, topic, description, rebutTx } = input;
  if (!(await isVouched(owner))) throw new Error('non-vouched');
  const arweave = getArweave();
  const tx = await arweave.createTransaction({
    data: JSON.stringify(data),
  });
  const tags = [
    { name: 'Permafacts-Type', value: 'Assertion-Alpha-v2-0.0.7' },
    { name: 'App-Name', value: 'SmartWeaveContract' },
    {
      name: 'Contract-Src',
      value: 'xLaL1bE6hYETzBdKZYzlyKJUhn7I5J-Oye609sW3qTU',
    },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Implements', value: 'ANS-110' },
    { name: 'Type', value: 'fact-post' },
    { name: 'Title', value: `${title}` },
    { name: 'Permafacts-Version', value: 'TODO' },
    { name: 'Render-With', value: 'facts-renderer' },
    { name: 'Content-Type', value: 'text/plain' },
    {
      name: 'Init-State',
      value: JSON.stringify({
        ...initialState,
        name: `${title}`,
        creator: owner,
      }),
    },
    ...addTags(topic, description),
  ];

  if (rebutTx) tags.push({ name: 'Fact-Rebuts', value: rebutTx });
  tags.forEach((t) => tx.addTag(t.name, t.value));
  console.log('TAGS ================= TAGS', tags);
  const wallet = getArweaveWallet();
  if (!wallet) throw new Error('Unable to find arweave wallet.');
  const result = await wallet.dispatch(tx);

  if (!result.id) {
    throw new Error('Failed to deploy assertion.');
  }

  // await warp.register(result.id, 'node2');
  await register(result.id);
  console.log('AFTER REGISTER ==========', { tx: result.id });
  return { tx: result.id };
}

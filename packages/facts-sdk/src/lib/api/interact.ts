import Transaction from 'arweave/node/lib/transaction';
import { BuyInput, SellInput } from './interface';
import { getArweave } from '@facts-kit/contract-kit';

export type Tags = {
  name: string;
  value: string;
}[];

export async function interaction(
  input: SellInput | BuyInput,
  contractTx: string,
  tags: Tags
): Promise<Transaction> {
  const arweave = getArweave();
  const tx = await arweave.createTransaction({});
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', contractTx);
  tx.addTag('Input', JSON.stringify(input));
  tx.addTag('SDK', 'Warp');
  tags.map((t) => {
    tx.addTag(t.name, t.value);
  });
  await arweave.transactions.sign(tx);
  return tx;
}

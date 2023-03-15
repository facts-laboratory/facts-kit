import { fetchAttachedFactMarket } from '../helpers/fetch-attached-fact-market';
import { getFactsLink } from './../helpers/get-facts-link';

/**
 * @description
 * If a fact market is attached to this transaction, the function
 * will return the tx of that transaction as well as the facts link.
 *
 * @author @mogulx_operates
 * @export
 * @param {string} tx
 * @return {*}  {Promise<{ tx?: string; link?: string }>}
 */
export async function hasFactMarket(
  tx: string
): Promise<{ tx?: string; link?: string }> {
  return fetchAttachedFactMarket(tx)
    .then((f: any) => ({ tx: f.id, link: getFactsLink(f.id) }))
    .catch((e: any) => {
      console.log(e);
      return {
        tx: undefined,
        link: undefined,
      };
    });
}

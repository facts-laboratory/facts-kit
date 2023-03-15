/**
 * @description Builds a link to the transaction on Permafacts web client.
 *
 * @author @mogulx_operates
 * @export
 * @param {string} tx
 * @return {*}
 */
export function getFactsLink(tx: string) {
  return `https://facts.g8way.io/#/assertion/${tx}`;
}

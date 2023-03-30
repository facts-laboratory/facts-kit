/**
 * @description Gets 'tx' from the query string
 * @todo MOVE TO RENDERER KIT
 * @example getTx(window?.location?.search);
 * @author @mogulx_operates
 * @param {string} queryString
 * @return {*} value of tx or null
 */
export function getTxFromQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  return params.get('tx');
}

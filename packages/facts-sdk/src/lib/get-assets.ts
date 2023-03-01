/**
 * @author mogulx_operates
 * @export
 * @interface AssetsOutput
 */
export interface AssetsOutput {
  logo_16: string;
  logo_32: string;
  logo: string;
}

/**
 * @description Returns an object with links to logos on arweave
 *
 * @author mogulx_operates
 * @export
 * @return {*}  {AssetsOutput}
 */
export function getAssets(): AssetsOutput {
  return {
    logo_16:
      'https://vgvuidqm6nqcgzllawyuhmyb4nopwixiwd2rbkpj6xygf6jlioxa.arweave.net/qatEDgzzYCNlawWxQ7MB41z7Iuiw9RCp6fXwYvkrQ64',
    logo_32:
      'https://b3jsqzpdaxfhskemnkrrnfyrc4os5qouggwokc7lrso3eez64sya.arweave.net/DtMoZeMFynkojGqjFpcRFx0uwdQxrOUL64ydshM-5LA',
    logo: '',
  };
}

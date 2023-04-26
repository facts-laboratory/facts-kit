export interface DeployAtomicFactMarketInput {
  rebutTx?: string;
  use?: Use;
  position: 'support' | 'oppose';
  tags: PermafactsTags;
  data: any;
}
export interface PermafactsTags {
  topics?: string[];
  type: string;
  title: string;
  description: string;
  renderWith?: string;
  cover?: string;
}
export type Use = 'bundlr' | 'warp' | 'arweaveWallet';

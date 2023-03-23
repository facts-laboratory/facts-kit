export interface DeployAtomicFactMarketInput {
  rebutTx?: string;
  use?: Use;
  position: 'support' | 'oppose';
  tags: ANS110Tags;
  data: any;
}
export interface ANS110Tags {
  topics?: string[];
  type: string;
  title: string;
  description: string;
}
export type Use = 'bundlr' | 'warp' | 'arweaveWallet';

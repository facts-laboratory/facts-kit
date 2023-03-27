export interface State {
  pf: number;
  author: number;
  pair: string;
  creator: string;
  name?: string;
  price: number;
  balances: {
    [address: string]: number;
  };
  oppositionBalances: {
    [address: string]: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canEvolve: boolean;
  evolve: string | null;
}
export interface DmmAction {
  input: DmmInput;
  caller: string;
}
export interface DmmInput {
  function: DmmFunction;
  target?: string;
  qty?: number;
  tx?: string;
  contentTxID?: string;
}

export interface BuyAction {
  input: BuyInput;
  caller: string;
}

export interface BuyInput {
  function: 'buy';
  positionType: 'support' | 'oppose';
  price: number;
  fee: number;
  qty: number;
  txId: string;
}

export interface DistributeAction {
  input: DistributeInput;
  caller: string;
}

export interface DistributeInput {
  function: 'distribute';
}
export interface AuthorDistributeAction {
  input: AuthorDistributeInput;
  caller: string;
}

export interface AuthorDistributeInput {
  function: 'authorDistribute';
}
export interface SellAction {
  input: SellInput;
  caller: string;
}

export interface SellInput {
  function: 'sell';
  positionType: 'support' | 'oppose';
  qty?: number;
}
export interface EvolveAction {
  input: EvolveInput;
  caller: string;
}

export interface EvolveInput {
  function: 'evolve';
  value: string;
}

export interface Result {
  target: string;
  pair: string;
  balance: number;
}

export type DmmFunction =
  | 'buy'
  | 'getPrice'
  | 'sell'
  | 'transfer'
  | 'set-content'
  | 'balance'
  | 'content-id'
  | 'allow'
  | 'claim'
  | 'test'
  | 'distribute'
  | 'returnUnused'
  | 'distributeRefundables'
  | 'processRefundables';

export type ContractResult =
  | { state: State }
  | { result: Result }
  | { price: number; fee: number }
  | { result: { contentTxId: string } };

export const initialState: State = {
  creator: '',
  pf: 0,
  author: 0,
  balances: {},
  oppositionBalances: {},
  price: 1,
  pair: 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA',
  canEvolve: true,
  evolve: null,
};

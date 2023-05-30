export interface State {
  creator_cut: number;
  pair: string;
  creator: string;
  name?: string;
  balances: {
    [address: string]: number;
  };
  oppositionBalances: {
    [address: string]: number;
  };
  position: 'support' | 'oppose';
}
export interface FactMarketAction {
  input: FactMarketInput;
  caller: string;
}
export interface FactMarketInput {
  function: FactMarketFunction;
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

export interface WithdrawAction {
  input: WithdrawInput;
  caller: string;
}

export interface WithdrawInput {
  function: 'withdraw';
}
export interface SellAction {
  input: SellInput;
  caller: string;
}

export interface SellInput {
  function: 'sell';
  positionType: 'support' | 'oppose';
  expected: number;
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

export type FactMarketFunction = 'buy' | 'sell' | 'withdraw' | 'evolve';

export type ContractResult =
  | { state: State }
  | { result: Result }
  | { price: number; fee: number };
export const initialState: State = {
  creator: '',
  creator_cut: 0,
  facts: 0,
  position: 'support',
  balances: {},
  oppositionBalances: {},
  pair: 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA',
  canEvolve: true,
  evolve: null,
};

export interface Transaction {
  id: string;
  owner: Owner;
  block: Block;
  tags: Tag[];
  cursor?: string;
}

export interface Owner {
  address: string;
}

export interface Block {
  timestamp: number;
  height: number;
}

export interface Tag {
  name: string;
  value: string;
}

export interface TransactionEdge {
  cursor: string;
  node: Transaction;
}

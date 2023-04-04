export interface Transaction {
  id: string;
  owner: Owner;
  block: Block;
  tags: Tag[];
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

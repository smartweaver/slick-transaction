export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> =
  { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
    [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Owner = {
  __typename?: "Owner";
  address: Scalars["String"]["output"];
  key: Scalars["String"]["output"];
};

export type Amount = {
  __typename?: "Amount";
  winston: Scalars["String"]["output"];
  ar: Scalars["String"]["output"];
};

export type MetaData = {
  __typename?: "MetaData";
  size: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Tag = {
  __typename?: "Tag";
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type Block = {
  __typename?: "Block";
  id: Scalars["ID"]["output"];
  timestamp: Scalars["Int"]["output"];
  height: Scalars["Int"]["output"];
  previous: Scalars["ID"]["output"];
};

export type Parent = {
  __typename?: "Parent";
  id: Scalars["ID"]["output"];
};

export type Bundle = {
  __typename?: "Bundle";
  id: Scalars["ID"]["output"];
};

export type Transaction = {
  __typename?: "Transaction";
  id: Scalars["ID"]["output"];
  anchor: Scalars["String"]["output"];
  signature: Scalars["String"]["output"];
  recipient: Scalars["String"]["output"];
  owner: Owner;
  fee: Amount;
  quantity: Amount;
  data: MetaData;
  tags: Array<Tag>;
  ingested_at?: Maybe<Scalars["Int"]["output"]>;
  block?: Maybe<Block>;
  /** @deprecated Use `bundledIn` */
  parent?: Maybe<Parent>;
  bundledIn?: Maybe<Bundle>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"]["output"];
};

export type TransactionEdge = {
  __typename?: "TransactionEdge";
  cursor: Scalars["String"]["output"];
  node: Transaction;
};

export type TransactionConnection = {
  __typename?: "TransactionConnection";
  pageInfo: PageInfo;
  count?: Maybe<Scalars["Int"]["output"]>;
  edges: Array<TransactionEdge>;
};

export type BlockEdge = {
  __typename?: "BlockEdge";
  cursor: Scalars["String"]["output"];
  node: Block;
};

export type BlockConnection = {
  __typename?: "BlockConnection";
  pageInfo: PageInfo;
  edges: Array<BlockEdge>;
};

export type Query = {
  __typename?: "Query";
  transaction?: Maybe<Transaction>;
  transactions: TransactionConnection;
  block?: Maybe<Block>;
  blocks: BlockConnection;
};

export type QueryTransactionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTransactionsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  owners?: InputMaybe<Array<Scalars["String"]["input"]>>;
  recipients?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tags?: InputMaybe<Array<TagFilter>>;
  bundledIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  ingested_at?: InputMaybe<RangeFilter>;
  block?: InputMaybe<RangeFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<SortOrder>;
};

export type QueryBlockArgs = {
  id?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryBlocksArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  height?: InputMaybe<RangeFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<SortOrder>;
};

export type TagFilter = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  values?: InputMaybe<Array<Scalars["String"]["input"]>>;
  op?: InputMaybe<TagOperator>;
  match?: InputMaybe<TagMatch>;
};

export enum TagOperator {
  Eq = "EQ",
  Neq = "NEQ",
}

export enum TagMatch {
  Exact = "EXACT",
  Wildcard = "WILDCARD",
  FuzzyAnd = "FUZZY_AND",
  FuzzyOr = "FUZZY_OR",
}

export type RangeFilter = {
  min?: InputMaybe<Scalars["Int"]["input"]>;
  max?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum SortOrder {
  HeightAsc = "HEIGHT_ASC",
  HeightDesc = "HEIGHT_DESC",
}

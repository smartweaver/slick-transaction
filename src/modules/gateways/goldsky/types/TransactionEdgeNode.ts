import { Owner } from "../../../ao/v0/types/Owner.ts";
import { Tag } from "../../../ao/v0/types/Tag.ts";
import {
  Amount,
  Block,
  Bundle,
  Maybe,
  MetaData,
  Parent,
  Scalars,
} from "../../../graphql/goldsky/types/Schema.ts";

export type TransactionEdgeNode = {
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
  bundledIn?: Maybe<Bundle>;
};

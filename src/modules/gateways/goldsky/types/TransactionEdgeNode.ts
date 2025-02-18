import {
  Amount,
  Block,
  Bundle,
  Maybe,
  MetaData,
  Scalars,
} from "../../../../standard/grahpql/types/Schema.ts";
import { Owner } from "../../../ao/v0/types/Owner.ts";
import { Tag } from "../../../ao/v0/types/Tag.ts";

export type TransactionEdgeNode = {
  __typename?: "Transaction";
  id?: Scalars["ID"]["output"];
  anchor?: Scalars["String"]["output"];
  block?: Maybe<Block>;
  bundledIn?: Maybe<Bundle>;
  data?: MetaData;
  fee?: Amount;
  ingested_at?: Maybe<Scalars["Int"]["output"]>;
  owner?: Owner;
  quantity?: Amount;
  recipient?: Scalars["String"]["output"];
  signature?: Scalars["String"]["output"];
  tags?: Array<Tag>;
};

import {
  BlockFilter,
  InputMaybe,
  Scalars,
  TagFilter,
} from "../../../../standard/grahpql/types/Schema.ts";
import { SortOrder } from "./SortOrder.ts";

export type QueryTransactionsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  owners?: InputMaybe<Array<Scalars["String"]["input"]>>;
  recipients?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tags?: InputMaybe<Array<TagFilter>>;
  bundledIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  block?: InputMaybe<BlockFilter>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<SortOrder>;
};

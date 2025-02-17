import { Scalars } from "../../../graphql/goldsky/types/Schema.ts";
import { TransactionEdgeNode } from "./TransactionEdgeNode.ts";

export type TransactionEdge = {
  __typename?: "TransactionEdge";
  cursor: Scalars["String"]["output"];
  node: TransactionEdgeNode;
};

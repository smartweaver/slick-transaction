import type * as Schema from "./Schema.ts";

export type GraphQLResponse<Data> = {
  data: Data;
};

export type TransactionConnectionResponse = GraphQLResponse<{
  transactions: Schema.TransactionConnection;
}>;

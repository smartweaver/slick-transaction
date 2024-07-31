import { TransactionQueryBuilder } from "./builders/TransactionQueryBuilder.ts";
import { TransactionsQueryBuilder } from "./builders/TransactionsQueryBuilder.ts";
import { QueryBuilderOptions } from "./types/QueryBuilderOptions.ts";

export function query(options: QueryBuilderOptions = {}) {
  options.server_url = options.server_url ||
    "https://arweave-search.goldsky.com/graphql";

  return {
    forTransaction: () => {
      return new TransactionQueryBuilder(options);
    },
    forTransactions: () => {
      return new TransactionsQueryBuilder(options);
    },
  };
}

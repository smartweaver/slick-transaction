import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { QueryTransactionArgs } from "../types/Schema.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

const GetTransactionOperation = `query GetTransaction(
  $id: ID!
) {
  transaction(id: $id) {
    {{ return_schema }}
  }
}
`;

export const ReturnSchema = `
    id
    owner {
      address
    }
    recipient
    block {
      timestamp
      height
      __typename
    }
    ingested_at
    tags {
      name
      value
      __typename
    }
`;

export class TransactionQueryBuilder
  extends AbstractQueryBuilder<QueryTransactionArgs> {
  protected operation: string;

  constructor(options?: QueryBuilderOptions) {
    super(options);

    this.operation = options.operation || GetTransactionOperation;

    this.returnSchema(options.return_schema || ReturnSchema);
  }

  build() {
    return {
      operationName: `GetTransaction`,
      query: this.buildQuery(),
      variables: this.operation_variables,
    };
  }

  id(value: QueryTransactionArgs["id"]) {
    this.operation_variables.id = value;
    return this;
  }
}

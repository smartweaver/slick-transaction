import { QueryTransactionArgs } from "../../../../standard/grahpql/types/Schema.ts";
import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

const GetTransactionOperation = `query GetTransaction(
  $id: ID!
) {
  transaction(id: $id) {
    {{ return_schema }}
  }
}
`;

export class TransactionQueryBuilder
  extends AbstractQueryBuilder<QueryTransactionArgs> {
  protected query = GetTransactionOperation;

  constructor(options?: QueryBuilderOptions) {
    super(options);
  }

  build() {
    return {
      operationName: `GetTransaction`,
      query: this.buildQuery(),
      variables: this.operation_variables,
    };
  }

  id(id: string) {
    this.operation_variables.id = id;
    return this;
  }
}

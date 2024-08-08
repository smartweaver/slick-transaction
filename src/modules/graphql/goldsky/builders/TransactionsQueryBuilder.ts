import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { QueryTransactionsArgs, SortOrder } from "../types/Schema.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

export const GetTransactionsOperation = `query GetTransactions(
  $after: String
  $block: RangeFilter
  $bundledIn: [ID!]
  $first: Int = 10
  $ids: [ID!]
  $owners: [String!]
  $recipients: [String!]
  $sortOrder: SortOrder = HEIGHT_DESC
  $tags: [TagFilter!]
) {
  transactions(
    after: $after
    block: $block,
    bundledIn: $bundledIn
    first: $first
    ids: $ids
    owners: $owners
    recipients: $recipients
    sort: $sortOrder,
    tags: $tags
  ) {
    {{ return_schema }}
  }
}`;

export const ReturnSchema = `
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
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
        __typename
      }
      __typename
    }
    __typename
`;

export class TransactionsQueryBuilder
  extends AbstractQueryBuilder<QueryTransactionsArgs> {
  protected operation: string;

  constructor(options?: QueryBuilderOptions) {
    super(options);

    this.operation = options.operation || GetTransactionsOperation;

    this.returnSchema(options.return_schema || ReturnSchema);
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  after(value: QueryTransactionsArgs["after"]) {
    if (this.isNullOrUndefined(value)) {
      return this;
    }

    this.operation_variables.after = value;
    return this;
  }

  block(value: QueryTransactionsArgs["block"]) {
    if (this.isNullOrUndefined(value?.max)) {
      return this;
    }

    if (this.isNullOrUndefined(value?.min)) {
      return this;
    }

    this.operation_variables.block = value;
    return this;
  }

  build() {
    if (this.operation_variables.after) {
      this.return_schema = this.return_schema.replace(/count/g, "");
    }

    const query = this.buildQuery();

    return {
      operationName: `GetTransactions`,
      query,
      variables: this.operation_variables,
    };
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  bundledIn(value: QueryTransactionsArgs["bundledIn"]) {
    if (this.isEmptyArray(value)) {
      return this;
    }

    this.operation_variables.bundledIn = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  first(value: QueryTransactionsArgs["first"]) {
    if (this.isNullOrUndefined(value)) {
      return this;
    }

    this.operation_variables.first = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  ids(value: QueryTransactionsArgs["ids"]) {
    if (this.isEmptyArray(value)) {
      return this;
    }

    this.operation_variables.ids = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  owners(value: QueryTransactionsArgs["owners"]) {
    if (this.isEmptyArray(value)) {
      return this;
    }

    this.operation_variables.owners = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  recipients(value: QueryTransactionsArgs["recipients"]) {
    if (this.isEmptyArray(value)) {
      return this;
    }

    this.operation_variables.recipients = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  sort(value: QueryTransactionsArgs["sort"]) {
    if (value !== SortOrder.HeightAsc && value !== SortOrder.HeightDesc) {
      return this;
    }

    this.operation_variables.sort = value;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  tags(value: QueryTransactionsArgs["tags"]) {
    if (this.isEmptyArray(value)) {
      return this;
    }

    this.operation_variables.tags = value;
    return this;
  }
}

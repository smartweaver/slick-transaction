import {
  QueryTransactionsArgs,
  SortOrder,
} from "../../../../standard/grahpql/types/Schema.ts";
import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

const GetTransactionsOperations = `query GetTransactions(
  $after: String
  $block: BlockFilter
  $bundledIn: [ID!]
  $first: Int = 10
  $ids: [ID!]
  $owners: [String!]
  $recipients: [String!]
  $sort: SortOrder = HEIGHT_DESC
  $tags: [TagFilter!]
) {
  transactions(
    after: $after
    block: $block
    bundledIn: $bundledIn
    first: $first
    ids: $ids
    owners: $owners
    recipients: $recipients
    sort: $sort
    tags: $tags
  ) {
    {{ return_schema }}
  }
}`;

export class TransactionsQueryBuilder
  extends AbstractQueryBuilder<QueryTransactionsArgs> {
  query = GetTransactionsOperations;

  constructor(options?: QueryBuilderOptions) {
    super(options);

    this.returnSchema(`
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
          quantity {
            ar
            winston
          }
          block {
            timestamp
            height
          }
          ingested_at
          tags {
            name
            value
          }
        }
      }
`);
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
    return {
      operationName: `GetTransactions`,
      query: this.buildQuery(),
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
   * Set the tags to send with the query.
   * @param tags The tags in question.
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

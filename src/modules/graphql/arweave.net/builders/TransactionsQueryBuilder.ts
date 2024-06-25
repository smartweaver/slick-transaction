import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { QueryTransactionsArgs, TagFilter } from "../types/Schema.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

const GetTransactionsOperations = `query GetTransactions(
  $ids: [ID!]
  $owners: [String!]
  $recipients: [String!]
  $tags: [TagFilter!]
  $bundledIn: [ID!]
  $block: BlockFilter
  $first: Int = 10
  $after: String
  $sort: SortOrder = HEIGHT_DESC
) {
  transactions(
    ids: $ids
    owners: $owners
    recipients: $recipients
    tags: $tags
    bundledIn: $bundledIn
    block: $block
    first: $first
    after: $after
    sort: $sort
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
        block {
          height
          timestamp
        }
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
  first(first: number) {
    this.operation_variables.first = first;
    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  after(after: string) {
    this.operation_variables.after = after;
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
  ids(ids: string[]) {
    this.operation_variables.ids = ids;

    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  owners(owners: string[]) {
    this.operation_variables.owners = owners;

    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  recipients(recipients: string[]) {
    this.operation_variables.recipients = recipients;
    return this;
  }

  /**
   * Set the tags to send with the query.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: TagFilter[]) {
    this.operation_variables.tags = tags;
    return this;
  }
}

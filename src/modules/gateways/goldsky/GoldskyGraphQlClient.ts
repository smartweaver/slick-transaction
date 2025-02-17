import { QueryTransactionsArgs } from "./types/QueryTransactionsArgs.ts";
import { TransactionEdge } from "./types/TransactionEdge.ts";
import { TransactionEdgeNode } from "./types/TransactionEdgeNode.ts";

class GoldskyGraphQlClientTypeError extends TypeError {}

export class GoldskyGraphQlClient {
  protected base_url: string;

  /**
   * @param baseUrl The gateway URL to use to query transactions.
   */
  constructor(baseUrl: string) {
    if (typeof baseUrl !== "string") {
      throw new GoldskyGraphQlClientTypeError(
        "Argument `baseUrl: string` must be a string",
      );
    }

    this.base_url = baseUrl;
  }
  /**
   * Query the `/graphql` endpoint for the transaction with the provided `id`.
   * @param id The transaction's ID.
   * @returns The results of the query.
   */
  queryTransaction(id: string): Promise<TransactionEdgeNode> {
    if (typeof id !== "string") {
      throw new GoldskyGraphQlClientTypeError(
        "Argument `id: string` is required",
      );
    }

    const query = fetch(
      this.base_url + "/graphql",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          operationName: "GetTransaction",
          query:
            "query GetTransaction($id: String) { transaction(id: $id) { pageInfo { hasNextPage } edges { cursor, node { id, owner, { address }, recipient, data { type, size }, block { height, timestamp }, quantity { ar, winston }, fee { ar, winston }, tags { name, value }, } } } }",
          variables: { id },
        }),
      },
    );

    return query.then((res) => res.json());
  }

  /**
   * Query the `/graphql` enpdoint for transactions with the provided
   * `variables`.
   * @param variables Variables to pass to GraphQL.
   * @param edges The edges currently found.
   * @returns All edges found from the query (or queries if there was more than
   * one page of edges).
   */
  queryTransactions(
    variables: Partial<QueryTransactionsArgs>,
    edges: TransactionEdge[] = [],
  ): Promise<TransactionEdge[]> {
    variables = variables || {};

    if (!Array.isArray(edges)) {
      edges = [];
    }

    if (variables.after) {
      variables.after = variables.after;
    }

    const query = fetch(
      this.base_url + "/graphql",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          operationName: "GetTransactions",
          query:
            "query GetTransactions($after: String, $block: RangeFilter, $bundledIn: [ID!], $first: Int = 100, $ids: [ID!], $owners: [String!], $recipients: [String!], $sortOrder: SortOrder = INGESTED_AT_DESC, $tags: [TagFilter!]) { transactions(after: $after, block: $block, bundledIn: $bundledIn, first: $first, ids: $ids, owners: $owners, recipients: $recipients, sort: $sortOrder, tags: $tags) { pageInfo { hasNextPage } edges { cursor, node { id, owner, { address }, recipient, data { type, size }, block { height, timestamp }, quantity { ar, winston }, fee { ar, winston }, tags { name, value }, } } __typename } }",
          variables,
        }),
      },
    );

    return query
      .then((res) => res.json())
      .then((result) => {
        const newEdges = result?.data?.transactions?.edges || [];

        const ret = [
          ...(edges || []),
          ...newEdges,
        ];

        if (result?.data?.transactions?.pageInfo?.hasNextPage) {
          const lastCursor = newEdges[newEdges.length - 1].cursor;

          if (!lastCursor) {
            return ret;
          }

          return this.queryTransactions(
            {
              ...variables,
              after: lastCursor,
            },
            ret,
          );
        }

        return ret;
      });
  }
}

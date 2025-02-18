import {
  QueryTransactionsArgs,
  TransactionEdgeNode,
} from "../../../standard/grahpql/types/Schema.ts";

class ArweaveGraphQlClientTypeError extends TypeError {}

export class ArweaveGraphQlClient {
  protected base_url: string;

  /**
   * @param baseUrl The gateway URL to use to query transactions.
   */
  constructor(baseUrl: string) {
    if (typeof baseUrl !== "string") {
      throw new ArweaveGraphQlClientTypeError(
        "Argument `baseUrl: string` must be a string",
      );
    }

    this.base_url = baseUrl;
  }

  /**
   * Call the `GetTransaction` operation to get a single transaction with the
   * provided `id`.
   * @param id The transaction's ID.
   * @returns The results of the query.
   */
  getTransaction(id: string): Promise<TransactionEdgeNode> {
    if (typeof id !== "string") {
      throw new ArweaveGraphQlClientTypeError(
        "Argument `id: string` must be a string",
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
   * Call the `GetTransactions` operation to get all transactions matching the
   * provided `variables`.
   * @param variables Variables to pass to GraphQL.
   * @param edges The edges currently found.
   * @returns All edges found from the query (or queries if there was more than
   * one page of edges).
   */
  getTranscations(
    variables: QueryTransactionsArgs,
    edges: TransactionEdgeNode[] = [],
  ): Promise<TransactionEdgeNode[]> {
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
          operationName: "GetTransaction",
          query:
            "query GetTransaction($id: String) { transaction(id: $id) { pageInfo { hasNextPage } edges { cursor, node { id, owner, { address }, recipient, data { type, size }, block { height, timestamp }, quantity { ar, winston }, fee { ar, winston }, tags { name, value }, } } } }",
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

          return this.getTranscations(
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

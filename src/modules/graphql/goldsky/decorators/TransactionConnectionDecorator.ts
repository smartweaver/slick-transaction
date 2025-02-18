import { TransactionEdge } from "../types/Schema.ts";
import { TransactionConnectionResponse } from "../types/Types.ts";

export class TransactionEdgesDecorator {
  #wrappee: TransactionEdge[];

  constructor(wrappee: TransactionEdge[]) {
    this.#wrappee = wrappee;
  }

  get original() {
    return this.#wrappee;
  }

  toNodesArray() {
    return (this.#wrappee || []).map((value) => {
      return value.node;
    });
  }
}

export class TransactionConnectionDecorator {
  #wrappee: TransactionConnectionResponse;

  constructor(wrappee: TransactionConnectionResponse) {
    this.#wrappee = wrappee;
  }

  get count() {
    return this.transactions.count || null;
  }

  get transactions() {
    return this.#wrappee?.data?.transactions;
  }

  get has_next_page() {
    let hasNextPage = this.transactions?.pageInfo?.hasNextPage || false;

    if (hasNextPage === false) {
      const edges = this.#getEdges();
      const hasEdges = Array.isArray(edges) && edges.length > 0;
      const hasCount = typeof this.count === "number";

      if (!hasEdges || !hasCount) {
        return false;
      }

      hasNextPage = (this.count - edges.length) > 0;
    }

    return hasNextPage;
  }

  get last_cursor() {
    return this.#getLastCursor();
  }

  get original() {
    return this.#wrappee;
  }

  edges() {
    return new TransactionEdgesDecorator(this.#getEdges());
  }

  /**
   * Get the last cursor from the last `TransactionEdge` of this wrapped
   * `TransactionConnection`.
   * @returns The last cursor if it exists or `null` if it does not exist.
   */
  #getLastCursor() {
    const edges = this.#getEdges();

    if (!edges) {
      return null;
    }

    const lastCursor = edges[edges.length - 1]?.cursor;

    if (!lastCursor) {
      return null;
    }

    return this.#rawCursorToInputCursor(lastCursor);
  }

  /**
   * Get the edges from the wrapped `TransactionConnection`.
   * @returns
   */
  #getEdges() {
    return this.transactions?.edges;
  }

  /**
   * @param cursor The cursor in question.
   * @returns The cursor without characters that GraphQL operations do not need.
   */
  #rawCursorToInputCursor(cursor: string) {
    if (typeof cursor !== "string") {
      return null;
    }

    if (cursor.trim() === "") {
      return null;
    }

    return cursor.replace(/=/g, "");
  }
}

export function wrap(tc?: TransactionConnectionResponse) {
  return new TransactionConnectionDecorator(tc);
}

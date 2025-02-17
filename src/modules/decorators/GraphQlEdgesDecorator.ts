import { TransactionEdge } from "../../standard/grahpql/types/Schema.ts";
import { decorateGraphQlEdge } from "./GraphQlEdgeDecorator.ts";

class GraphQlEdgesDecoratorErrorTypeError extends TypeError {}

class GraphQlEdgesDecorator<TxEdge extends TransactionEdge = TransactionEdge> {
  protected edges: TxEdge[];

  constructor(edges: TxEdge[]) {
    if (!edges) {
      throw new GraphQlEdgesDecoratorErrorTypeError(
        "Argument `edges: TransactionEdge[]` is required",
      );
    }

    // Remove undefined values
    this.edges = (edges || []).filter((edge) => edge?.node);
  }

  /**
   * Filter confirmations with the min number of provided `minConfirmations`.
   * @param networkHeight The network height to calculate confirmations against.
   * @param minConfirmations The min number of confirmations a transaction must
   * have to be returned by this method.
   * @returns Transactions with the provided `minConfirmations`.
   */
  async filterEdgesByConfirmations(
    networkHeight: number,
    minConfirmations: number,
  ): Promise<GraphQlEdgesDecorator> {
    if (!minConfirmations) {
      throw new GraphQlEdgesDecoratorErrorTypeError(
        "Argument `minConfirmations: number` is required",
      );
    }

    const filteredEdges = this.edges
      .map((edge) => decorateGraphQlEdge(edge))
      .filter((edge) => edge.hasBlockHeight())
      .filter((edge) => edge.hasConfirmations(minConfirmations, networkHeight))
      .map((edge) => edge.toTransactionEdge());

    return new GraphQlEdgesDecorator(filteredEdges);
  }

  /**
   * Filter edges that have a block height.
   * @returns All transaction edges that have a `block` field with a number.
   */
  filterEdgesWithBlockHeight(): GraphQlEdgesDecorator {
    const filteredEdges = this.edges
      .map((edge) => decorateGraphQlEdge(edge))
      .filter((edge) => edge.hasBlockHeight())
      .map((edge) => edge.toTransactionEdge());

    return new GraphQlEdgesDecorator(filteredEdges);
  }

  /**
   * Filter edges that have a block height in between or equal to the provided
   * `min` and `max` block heights.
   * @param min The min block height an edge should have to pass the filter.
   * @param max The max block height an edge should have to pass the filter.
   * @returns All edges that have a block height in between or equal to the
   * provided `min` and `max` block heights.
   */
  filterEdgesByBlockHeight(min: number, max?: number) {
    const filteredEdges = this.edges
      .map((edge) => decorateGraphQlEdge(edge))
      .filter((edge) => edge.hasBlockHeightGreaterThanOrEqualTo(min))
      .filter((edge) => edge.hasBlockHeightLessThanOrEqualTo(max || min))
      .map((edge) => edge.toTransactionEdge());

    return new GraphQlEdgesDecorator(filteredEdges);
  }

  /**
   * Filter edges that do not have a block height.
   * @returns All edges that do not have a block height.
   */
  filterEdgesWithoutBlockHeight(): GraphQlEdgesDecorator {
    const filteredEdges = this.edges
      .map((edge) => decorateGraphQlEdge(edge))
      .filter((edge) => !edge.hasBlockHeight())
      .map((edge) => edge.toTransactionEdge());

    return new GraphQlEdgesDecorator(filteredEdges);
  }

  /**
   * Filter edges that have tags matching the provided `tagName` and `tagValue`.
   * @param tagName The tag name to match against.
   * @param tagValue The tag value to match against.
   * @returns All edges that match the tag name and value.
   */
  filterEdgesByTag(
    tagName: string,
    tagValue: string,
  ): GraphQlEdgesDecorator {
    const filteredEdges = this.edges
      .map((edge) => decorateGraphQlEdge(edge))
      .filter((edge) => edge.hasTag(tagName, tagValue))
      .map((edge) => edge.toTransactionEdge());

    return new GraphQlEdgesDecorator(filteredEdges);
  }

  /**
   * Get the IDs from every node in these edges.
   * @returns All node IDs.
   */
  nodeIds() {
    return this.edges.map((edge) => edge.node.id);
  }

  /**
   * Get the nodes from these edges.
   * @returns All nodes in these edges or an empty array if there are no edges.
   */
  nodes() {
    return this.edges.map((edge) => edge.node);
  }

  /**
   * Convert these decorated edges back to their original form.
   * @returns The original edges without this decorator.
   */
  toTransactionEdges() {
    return this.edges;
  }
}

export function decorateGraphQlEdges(edges: TransactionEdge[]) {
  return new GraphQlEdgesDecorator(edges);
}

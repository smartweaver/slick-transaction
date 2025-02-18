import { TransactionEdge } from "../graphql/arweave.net/types/Schema.ts";

class GraphQlEdgeTypeError extends TypeError {}

class GraphQlEdge<TxEdge extends TransactionEdge = TransactionEdge> {
  protected edge: TxEdge;
  protected tx: TxEdge["node"];

  constructor(edge: TxEdge) {
    if (!edge || !edge?.node) {
      throw new GraphQlEdgeTypeError(
        "Argument `edge: TransactionEdge` is required",
      );
    }

    this.edge = edge;
    this.tx = edge.node;
  }

  /**
   * Does this edge have a block height?
   * @returns `true` if yes, `false` if no.
   */
  hasBlockHeight() {
    const height = this.tx.block?.height;

    if (typeof height !== "number") {
      return false;
    }

    if (height === Infinity) {
      return false;
    }

    if (height < 0) {
      return false;
    }

    if (isNaN(height)) {
      return false;
    }

    return true;
  }

  /**
   * Does this edge have a block height greater than to the provided `height`?
   */
  hasBlockHeightGreaterThan(height: number) {
    if (typeof height !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `height` must be a number",
      );
    }

    if (!this.hasBlockHeight()) {
      return false;
    }

    const blockHeight = this.tx.block.height;

    return blockHeight > height;
  }

  /**
   * Does this edge have a block height greater than or equal to the provided
   * `height`?
   */
  hasBlockHeightGreaterThanOrEqualTo(height: number) {
    if (typeof height !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `height` must be a number",
      );
    }

    if (!this.hasBlockHeight()) {
      return false;
    }

    const blockHeight = this.tx.block.height;

    return blockHeight >= height;
  }

  /**
   * Does this edge have a block height less than the provided `height`.
   */
  hasBlockHeightLessThan(height: number) {
    if (typeof height !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `height` must be a number",
      );
    }

    if (!this.hasBlockHeight()) {
      return false;
    }

    const blockHeight = this.tx.block.height;

    return blockHeight < height;
  }

  /**
   * Does this edge have a block height less than or equal to the provided
   * `height`?
   */
  hasBlockHeightLessThanOrEqualTo(height: number) {
    if (typeof height !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `height` must be a number",
      );
    }

    if (!this.hasBlockHeight()) {
      return false;
    }

    const blockHeight = this.tx.block.height;

    return blockHeight <= height;
  }

  /**
   * Does this edge have the provided `confirmations` compared to the provided
   * `networkHeight`?
   * @param networkHeight The network height to check against.
   * @param confirmations The number confirmations to check.
   * @returns `true if yes, `false` if no.
   */
  hasConfirmations(networkHeight: number, confirmations: number) {
    if (typeof networkHeight !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `networkHeight` must be a number",
      );
    }

    if (typeof confirmations !== "number") {
      throw new GraphQlEdgeTypeError(
        "Argument `confirmations` must be a number",
      );
    }

    if (!this.hasBlockHeight()) {
      return false;
    }

    const txHeight = this.tx.block.height;

    if ((networkHeight - txHeight) >= confirmations) {
      return true;
    }

    return false;
  }

  hasTag(tagName: string, tagValue: string) {
    if (typeof tagName !== "string") {
      throw new GraphQlEdgeTypeError(
        "Argument `tagName` must be a string",
      );
    }

    if (typeof tagValue !== "string") {
      throw new GraphQlEdgeTypeError(
        "Argument `tagValue` must be a string",
      );
    }

    const tags = this.tx.tags || [];

    for (const tag of tags) {
      if (tag.name === tagName && tag.value === tagValue) {
        return true;
      }
    }

    return false;
  }

  /**
   * Convert this decorated edge back to its original form.
   * @returns The original edge without this decorator.
   */
  toTransactionEdge() {
    return this.edge;
  }
}

export function decorateGraphQlEdge<
  TxEdge extends TransactionEdge = TransactionEdge,
>(edge: TxEdge) {
  return new GraphQlEdge<TxEdge>(edge);
}

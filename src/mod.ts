import { Parser } from "./Parser.ts";
import { TransactionBuilder } from "./transactions/TransactionBuilder.ts";

export class Transaction {
  /**
   * Get the builder for building Arweave transactions.
   * @returns The builder.
   */
  static builder() {
    return new TransactionBuilder();
  }

  /**
   * Get the parser for parsing transaction data.
   * @returns The parser.
   */
  static parser() {
    return new Parser();
  }
}

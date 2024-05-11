import { TransactionBuilder } from "./TransactionBuilder.ts";
import { TransactionFormat1 as Tx1 } from "./interfaces/TransactionFormat1.ts";

export class Transaction {
  /**
   * Get the "format 2" transaction builder.
   * @returns An instance of the transaction builder.
   */
  static builder() {
    return new TransactionBuilder();
  }

  /**
   * Get the "format 1" transaction builder and start with the given `fields`.
   * This differs from {@linkcode Transaction.builder()} because it allows you
   * to start with initial fields.
   * @param fields The transaction fields to start the builder with.
   * @returns An instance of the transaction builder with the `fields` set on
   * the transaction being built.
   */
  static from(
    fields: Partial<Tx1 | { tags: Record<string, string> }>,
  ): TransactionBuilder {
    if (!fields) {
      fields = {};
    }

    let normalizedTags = {};

    if (Array.isArray(fields.tags)) {
      for (const tag of fields.tags) {
        if (tag.name) {
          normalizedTags[tag.name] = tag.value;
        }
      }
    } else {
      normalizedTags = fields.tags || {};
    }

    return new TransactionBuilder({
      ...fields,
      tags: normalizedTags,
    });
  }
}

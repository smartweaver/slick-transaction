import { AbstractTransactionBuilder } from "../../../core/AbstractTransactionBuilder.ts";
import { TransactionFormat1 as Tx1 } from "./interfaces/TransactionFormat1.ts";
import { Transaction } from "./Transaction.ts";

export class TransactionBuilder extends AbstractTransactionBuilder<Tx1> {
  /**
   * @deprecated on 2024-08-17. Use {@link Transaction.from}.
   *
   * Set the transaction's attributes using the given attributes. This method
   * exists to set attributes in one go as opposed to doing it with chained
   * methods. An example use case is if a transaction is received in JSON fromat
   * and can be used to set most of the fields in this builder. Instead of
   * adding the fields one by one with chained methods, it can be done using
   * this single method.
   * @param attributes The transaction attributes in question.
   * @returns `this` instance for further method chaining.
   */
  attributes(attributes: Partial<Tx1> = {}) {
    return Transaction.from(attributes);
  }

  override build(): Tx1 {
    return {
      ...super.build(),
      format: 1,
    };
  }

  /**
   * Set the `data` field.
   * @param quantity The value to set as the field.
   * @returns `this` instance for further method chaining.
   */
  data(data: string | Uint8Array) {
    if (typeof data === "string") {
      data = new TextEncoder().encode(data);
    }

    this.transaction.data = data;
    return this;
  }
}

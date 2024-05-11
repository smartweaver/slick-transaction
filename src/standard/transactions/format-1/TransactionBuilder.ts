import { AbstractTransactionBuilder } from "../../../core/AbstractTransactionBuilder.ts";
import { TransactionFormat1 as Tx1 } from "./interfaces/TransactionFormat1.ts";

export class TransactionBuilder extends AbstractTransactionBuilder<Tx1> {
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

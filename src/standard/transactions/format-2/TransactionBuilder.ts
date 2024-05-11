import { AbstractTransactionBuilder } from "../../../core/AbstractTransactionBuilder.ts";
import { TransactionFormat2 as Tx2 } from "./interfaces/TransactionFormat2.ts";

export class TransactionBuilder extends AbstractTransactionBuilder<Tx2> {
  override build(): Tx2 {
    return {
      ...super.build(),
      format: 2,
    };
  }

  /**
   * Set the `data` field.
   * @param quantity The value to set as the field.
   * @returns `this` instance for further method chaining.
   */
  data(data: any) {
    if (typeof data === "string") {
      data = new TextEncoder().encode(data);
    }

    this.transaction.data = data;
    return this;
  }

  /**
   * Set the `data_root` field.
   * @param quantity The value to set as the field.
   * @returns `this` instance for further method chaining.
   */
  dataRoot(dataRoot: string) {
    this.transaction.data_root = dataRoot;
    return this;
  }

  /**
   * Set the `data_size` field.
   * @param quantity The value to set as the field.
   * @returns `this` instance for further method chaining.
   */
  dataSize(dataSize: string) {
    this.transaction.data_size = dataSize;
    return this;
  }
}

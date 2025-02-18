import { AbstractTransactionBuilder } from "../../../core/AbstractTransactionBuilder.ts";
import { ITransaction } from "./interfaces/ITransationFormat.ts";
import { Transaction } from "./Transaction.ts";

export class TransactionBuilder
  extends AbstractTransactionBuilder<ITransaction> {
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
  attributes(attributes: Partial<ITransaction> = {}) {
    return Transaction.from(attributes);
  }

  override build(): ITransaction {
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

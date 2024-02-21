import { ArweaveTransactionAttributes } from "../../deps.ts";
import { AbstractTransaction } from "./AbstractTransaction.ts";

export class Transaction extends AbstractTransaction {
  #attributes?: Partial<Omit<ArweaveTransactionAttributes, "tags">>;

  /**
   * Set this transaction's attributes.
   * @param attributes The transaction's attributes.
   * @returns `this` instance for further method chaining.
   */
  attributes(attributes: Partial<Omit<ArweaveTransactionAttributes, "tags">>) {
    this.#attributes = attributes;
    return this;
  }

  /**
   * Sign the transaction.
   * @returns The signed transaction.
   */
  async sign() {
    if (!this.#attributes) {
      throw new Error(`Cannot sign transaction without attributes`);
    }

    this.tx = await this.arweave.createTransaction(this.#attributes);

    return super.sign();
  }
}

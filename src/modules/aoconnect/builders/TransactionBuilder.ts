import { Transaction } from "../../../standard/transactions/format-2/Transaction.ts";
import { AoConnect } from "../interfaces/AoConnect.ts";

export class TransactionBuilder {
  protected aoconnect: AoConnect;
  protected data_item_signer: any;

  /**
   * A transaction builder to help build this message's fields (e.g., data,
   * tags, etc.).
   */
  protected tx_builder = Transaction.builder();

  constructor(aoconnect: AoConnect) {
    this.aoconnect = aoconnect;
  }

  /**
   * Set the data to send with this action.
   *
   * @param data The data in question.
   * @returns `this` instance for further method chaining.
   */
  data(data: any) {
    this.tx_builder.data(data);
    return this;
  }

  /**
   * Set the `DataItem` signer that aoconnect should use to sign this action.
   *
   * @param signer The signer in question.
   * @returns `this` instance for further method chaining.
   */
  dataItemSigner(signer: any): this {
    this.data_item_signer = signer;
    return this;
  }

  /**
   * Add tags to the transaction.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: Record<string, string> = {}) {
    this.tx_builder.tags(tags);
    return this;
  }
}

import { Transaction } from "../../../standard/transactions/format-2/Transaction";
import { AoConnect } from "../interfaces/AoConnect";

// @ts-ignore Use of `any` is intentional
type Constructor = new (...args: any[]) => any;

export function TransactionBuilder(Base?: Constructor) {
  const BaseClass = Base || class BaseBuilder {};

  return class Builder extends BaseClass {
    protected data_item_signer: any;
    protected aoconnect: AoConnect;

    /**
     * A transaction builder to help build this message's fields (e.g., data,
     * tags, etc.).
     */
    protected tx_builder = Transaction.builder();

    constructor(...args: any[]) {
      const [aoconnect, ...rest] = args;
      super(...rest);
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
  };
}

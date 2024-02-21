import type Transaction from "arweave/node/lib/transaction";
import type Arweave from "arweave";
import { JWK } from "../interfaces/JWK";

type Tags = Record<string, string>;

export abstract class AbstractTransaction {
  protected tx?: Transaction;
  protected arweave: Arweave;
  protected fields: {
    tags?: Tags;
  } = {};
  protected signing_key?: JWK;

  constructor(arweave: Arweave) {
    this.arweave = arweave;
  }

  /**
   * Add tags to the transaction.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: Tags) {
    this.fields.tags = tags;
    return this;
  }

  signingKey(key: JWK) {
    this.signing_key = key;
    return this;
  }

  /**
   * Sign the transaction.
   * @returns The signed transaction.
   */
  async sign() {
    if (!this.tx) {
      throw new Error("Cannot sign transaction. Field `this.tx` is not set.");
    }

    for (const [name, value] of Object.entries(this.fields.tags || {})) {
      this.tx.addTag(name, value);
    }

    if (this.signing_key) {
      await this.arweave.transactions.sign(this.tx, this.signing_key);
    } else {
      await this.arweave.transactions.sign(this.tx);
    }

    return this.tx;
  }
}

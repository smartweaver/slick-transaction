import { Transaction } from "./interfaces/Transaction.ts";

export abstract class AbstractTransactionBuilder<Tx extends Transaction = any> {
  /**
   * The transaction being built by this builder.
   */
  protected transaction: Partial<Tx> = {};

  /**
   * Tags to add to the transaction.
   */
  protected transaction_tags: Record<string, string> = {};

  constructor(attributes: Partial<Tx | { tags: Record<string, string> }> = {}) {
    const { tags = {}, ...fields } = attributes;
    this.transaction = fields as Partial<Tx>;

    let normalizedTags = {};

    if (Array.isArray(tags)) {
      for (const tag of tags) {
        if (tag.name) {
          normalizedTags[tag.name] = tag.value;
        }
      }
    } else {
      normalizedTags = tags || {};
    }

    this.transaction_tags = normalizedTags;
  }

  /**
   * Set the transaction's attributes using the given attributes. This method
   * exists to set attributes in one go as opposed to doing it with chained
   * methods. An example use case is if a transaction is received in JSON fromat
   * and can be used to set most of the fields in this builder. Instead of
   * adding the fields one by one with chained methods, it can be done using
   * this single method.
   * @param attributes The transaction attributes in question.
   * @returns `this` instance for further method chaining.
   */
  attributes(attributes: Partial<Tx> = {}) {
    this.transaction = {
      ...this.transaction,
      ...attributes,
    };

    return this;
  }

  /**
   * Build the transaction.
   * @returns The built transaction.
   */
  build(): Tx {
    const tx = this.transaction;
    tx.tags = this.getTagsAsToNameValueArray();

    return tx as Tx;
  }

  // /**
  //  * Sign the transaction.
  //  * @returns The signed transaction.
  //  */
  // sign(key?: JWK) {
  //   if (!this.transaction_signer) {
  //     throw new Error(
  //       "Cannot sign transaction. Transaction signer was not provided.",
  //     );
  //   }

  //   return this.transaction_signer.sign<Tx>(this.transaction, key);
  // }
  // /**
  //  * Verify the signature of the transaction being built by this builder.
  //  * @returns This instance for further method chaining.
  //  */
  // verify(transaction: Tx): ReturnType<TransactionSigner["verify"]> {
  //   if (!this.transaction_signer) {
  //     throw new Error(
  //       "Cannot verify transaction. Transaction signer was not provided.",
  //     );
  //   }

  //   return this.transaction_signer?.verify(transaction);
  // }

  /**
   * Add tags to the transaction.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: Record<string, string> = {}) {
    const currentTags = (this.transaction_tags || {});
    const actionTag = currentTags?.Action;

    this.transaction_tags = {
      ...currentTags, // Keep the current tags
      ...(tags || {}), // Overwrite the current tags if any
      ...(actionTag ? { Action: actionTag } : {}) // Keep the Action tag if any
    };

    return this;
  }

  // /**
  //  * Set the signer for this transaction.
  //  * @param signer The signer in question. See {@linkcode TransactionSigner}.
  //  */
  // signer(signer: TransactionSigner<any>) {
  //   this.transaction_signer = signer;
  //   return this;
  // }

  /**
   * Set the target address to transfer the AR to.
   * @param address The target address to transfer the AR to.
   * @returns `this` instance for further method chaining.
   */
  target(address: string) {
    this.transaction.target = address;
    return this;
  }

  /**
   * Set the `quantity` field.
   * @param quantity The value to set as the field.
   * @returns `this` instance for further method chaining.
   */
  quantity(quantity: Transaction["quantity"]) {
    this.transaction.quantity = quantity;
    return this;
  }

  /**
   * Get the tags being added to this transaction as the name-value array.
   * @returns An array that conforms to the expected transaction tags schema.
   */
  protected getTagsAsToNameValueArray() {
    if (!this.transaction_tags) {
      return [];
    }

    if (typeof this.transaction_tags !== "object") {
      return [];
    }

    if (Array.isArray(this.transaction_tags)) {
      throw new Error(
        "Cannot get tags as `{ name: string; value: string }` array. Tags object is already an array.",
      );
    }

    if (!Object.keys(this.transaction_tags).length) {
      return [];
    }

    return Object.keys(this.transaction_tags).map((key) => {
      return {
        name: key,
        value: this.transaction_tags[key],
      };
    });
  }
}

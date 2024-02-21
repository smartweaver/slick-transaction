import { AbstractTransaction } from "./AbstractTransaction.ts";

type Fields = {
  quantity: string;
  target: string;
};

export class TransferTransaction extends AbstractTransaction {
  #fields: Partial<Fields> = {};

  /**
   * Set the quantity of AR to transfer to the target address.
   * @param quantity The amount of AR to transfer.
   * @returns `this` instance for further method chaining.
   */
  quantity(quantity: string) {
    this.#fields.quantity = quantity;
    return this;
  }

  /**
   * Sign the transaction.
   * @returns The signed transaction.
   */
  async sign() {
    if (!this.#fields.quantity) {
      throw new Error(
        "Cannot sign transaction. Field `this.quantity` is not set.",
      );
    }

    if (!this.#fields.target) {
      throw new Error("Cannot sign transaction. Field `this.to` is not set.");
    }

    this.tx = await this.arweave.createTransaction({
      target: this.#fields.target,
      quantity: this.#fields.quantity,
    });

    return super.sign();
  }

  /**
   * Set the target address to transfer the AR to.
   * @param walletAddress The target address to transfer the AR to.
   * @returns `this` instance for further method chaining.
   */
  target(walletAddress: string) {
    this.#fields.target = walletAddress;
    return this;
  }
}

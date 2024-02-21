import { Bundler } from "../interfaces/Bundler.ts";
import { AbstractTransaction } from "./AbstractTransaction.ts";

export class BundleTransaction extends AbstractTransaction {
  #items?: (Uint8Array | string)[];
  #bundler?: Bundler<unknown>;

  items(items: (Uint8Array | string)[]) {
    this.#items = items;
    return this;
  }

  bundler<T = any>(bundler: Bundler<T>) {
    this.#bundler = bundler;
    return this;
  }

  /**
   * Sign the bundle.
   * @returns The signed transaction.
   */
  async sign() {
    if (!this.signing_key) {
      throw new Error(`Cannot sign bundle transaction without a private key`);
    }

    if (!this.#items || !Array.isArray(this.#items) || !this.#items.length) {
      throw new Error(`Cannot sign bundle transaction without data items`);
    }

    if (!this.#bundler) {
      throw new Error(`Canont sign bundle transaction without bundler`);
    }

    const bundle = await this.#bundler.bundleAndSignData(
      this.#items,
      this.signing_key,
    );

    this.tx = await this.arweave.createTransaction(
      {
        // @ts-ignore TODO(crookse) Add the return typing for the
        // `bundleAndSignData()` function
        data: bundle.getRaw(),
      },
      this.signing_key,
    );

    this.tags({
      "Bundle-Format": "binary",
      "Bundle-Version": "2.0.0",
    });

    return super.sign();
  }
}

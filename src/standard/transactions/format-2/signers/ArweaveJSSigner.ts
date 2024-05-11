import { AbstractTransactionSigner } from "../../../../core/AbstractTransactionSigner.ts";
import { JWK } from "../../../../core/interfaces/JWK.ts";
import { Transaction as CoreTx } from "../../../../core/interfaces/Transaction.ts";

interface IArweaveJS {
  /**
   * Create a transaction using the given attributes.
   * @param attributes The attributes to use to create the transaction.
   */
  createTransaction(attributes: MinimumTxFields): Promise<ArweaveJSTransaction>;

  /** Object containing transaction-related members. */
  transactions: {
    /**
     * Create a transaction using the given attributes.
     * @param attributes The attributes to use to create the transaction.
     */
    fromRaw(attributes: MinimumTxFields): ArweaveJSTransaction;

    /**
     * Sign the given transaction.
     * @param transaction The transaction in question.
     * @param jwk (Optional) The key to use to sign the transaction.
     * @param signatureOptions (Optional) Options to consider when signing the transaction.
     */
    sign(
      transaction: ArweaveJSTransaction,
      jwk?: JWK,
      signatureOptions?: { saltLength?: number },
    ): Promise<void> | void;

    /**
     * Verify the signature data of the given transaction.
     * @param transaction The transaction in question.
     */
    verify(transaction: CoreTx): Promise<boolean>;
  };
}

type MinimumTxFields = Omit<CoreTx, "tags">;

/**
 * Typing to match the arweave-js library's transaction, but only requiring the
 * minimum members.
 */
type ArweaveJSTransaction = CoreTx & {
  /**
   * Convert this transaction to JSON.
   */
  toJSON(): CoreTx;

  /**
   * Add a tag to this transaction.
   * @param name The tag's name.
   * @param value The tag's value.
   */
  addTag(name: string, value: string): void;
};

/**
 * Options to consider when instantiating {@linkcode ArweaveJSSigner}.
 */
type Options = {
  /**
   * An interface matching the `Arweave` instance from the arweave-js library.
   * @link https://github.com/ArweaveTeam/arweave-js
   */
  arweave: IArweaveJS;
};

type SignMethodOptions = {
  key?: JWK;
};

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - PUBLIC API ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a signer that uses arweave-js under the hood.
 *
 * @param options See {@linkcode Options}
 *
 * @example
 * ```
 * import Arweave from "arweave";
 * import { ArweaveJSSigner } from "@smartweaver/slick-transaction/standard/transactions/format-2/signers/ArweaveJSSigner";
 * import { Transaction } from "@smartweaver/slick-transaction/standard/transactions/format-2/Transaction";
 * import MyJWK from "./path/to/jwk.ts";
 *
 * // Get the arweave-js instance
 * const arweave = Arweave.init({
 *   host: "arweave.net",
 *   port: 443,
 *   protocol: "https"
 * });
 *
 * // Create this signer
 * const signer = new ArweaveJSSigner({ arweave })
 *
 * // Create a transaction
 * const tx = Transaction
 *   .builder()
 *   .target("paxvhrSttpNtfCggtmOlmEOeECJDfJCSZVRHWLoYwCs")
 *   .quantity("1")
 *   .tags({
 *     "Test-1": "Value 1",
 *     "Test-2": "Value 2",
 *   })
 *   .build();
 *
 * // Sign the transaction with this signer
 * const txSigned = await signer.sign(tx, { key: MyJWK });
 *
 * // Verify the transaction's signature data
 * await signer.verify(txSigned) // => true
 *
 * // - end of example -
 * ```
 */
export class ArweaveJSSigner<Tx extends CoreTx>
  extends AbstractTransactionSigner<Tx> {
  protected options: Options;

  constructor(options: Options) {
    super();
    this.options = options;
  }

  async sign(inputTx: Tx, options?: SignMethodOptions): Promise<Tx> {
    const arweaveJsTx = await this.#toArweaveJsTx(inputTx);

    if (options && options.key) {
      await this.options.arweave.transactions.sign(arweaveJsTx, options.key);
    } else {
      await this.options.arweave.transactions.sign(arweaveJsTx);
    }

    // Return the original transaction with signature data. The tags are
    // reassigned here so the caller gets the same object back -- just signed.
    const originalTransactionSigned = arweaveJsTx.toJSON();

    return originalTransactionSigned as unknown as Tx;
  }

  verify(inputTx: Tx): Promise<boolean> {
    // Convert to ArweaveJS transaction so it can be verified using ArweaveJS'
    // APIs
    const tx = this.options.arweave.transactions.fromRaw(inputTx);

    // Convert the transaction back so its interface is kept intact for the
    // caller
    return this.options.arweave.transactions.verify(tx);
  }

  /**
   * Convert the given transaction to an ArweaveJS-compatible transaction.
   * @param inputTx The transaction in question.
   * @returns An ArweaveJS-compatible transaction.
   */
  async #toArweaveJsTx(inputTx: Tx) {
    const { tags: _tagsArray = [], ...txAttributes } = inputTx;

    const tx = await this.options.arweave.createTransaction(txAttributes);

    for (const tag of inputTx.tags || []) {
      tx.addTag(tag.name, tag.value);
    }

    return tx;
  }
}

import { JWK } from "./JWK";
import { Transaction as Tx } from "./Transaction";

type Options = {
  key?: JWK;
};

/**
 * The `TransactionSigner` is responsible for providing the method used to sign
 * a transaction and verify a transaction's signature.
 * @template TxToSign The type of transaction this signer signs.
 */
export interface TransactionSigner<TxToSign extends Tx = any> {
  /**
   * Sign the given transaction.
   * @param transaction The transaction in question.
   * @param options (Optional) Options to consider when signing the transaction.
   * @returns The signed transaction.
   */
  sign(
    transaction: Partial<TxToSign>,
    options?: Options,
  ): Promise<TxToSign> | TxToSign;

  /**
   * Validate the given signing key.
   * @param key The signing key in question.
   * @returns `true` if valid, `false` if not.
   */
  validateSigningKey<K>(key: K): Promise<boolean> | boolean;

  /**
   * Verify a ___signed___ transaction's fields.
   * @param transaction The transaction in question.
   * @returns `true` if the transaction is valid, `false` if not.
   */
  verify(signedTransaction: unknown): Promise<boolean> | boolean;
}

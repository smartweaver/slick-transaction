import { Transaction as Tx } from "./interfaces/Transaction.ts";
import { TransactionSigner } from "./interfaces/TransactionSigner.ts";

export abstract class AbstractTransactionSigner<
  TxToSign extends Tx = any,
> implements TransactionSigner<TxToSign> {
  abstract sign(
    transaction: TxToSign,
    key?: unknown,
  ): Promise<TxToSign> | TxToSign;

  abstract verify(transaction: unknown): Promise<boolean> | boolean;

  validateSigningKey<K>(key: K): Promise<boolean> | boolean {
    const jwkKeyFields = [
      "n",
      "e",
      "d",
      "p",
      "q",
      "dp",
      "dq",
      "qi",
    ];

    if (!key) {
      throw new Error(
        `Cannot validate signing key. The signing key was not provided.`,
      );
    }

    if (typeof key !== "object") {
      throw new Error(
        `The provided signing key's type is invalid. Type '${typeof key}' was provided; type 'object' was expected.`,
      );
    }

    if (Array.isArray(key)) {
      throw new Error(
        `The provided signing key's type is invalid. Type 'array' was provided; type 'object' was expected.`,
      );
    }

    for (const field of jwkKeyFields) {
      if (!(field in key)) {
        throw new Error(
          `The provided signing key is invalid. Signing key is missing '${field}' field.`,
        );
      }
    }

    return true;
  }
}

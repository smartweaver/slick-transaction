import { Transaction as CoreTransaction } from "../../../../core/interfaces/Transaction.ts";

/**
 * A version 1 (aka format 1) transaction.
 * @see https://docs.arweave.org/developers/arweave-node-server/http-api#field-definitions
 */
export interface TransactionFormat1 extends CoreTransaction {
  /**
   * The data to be submitted. If no data is being submitted then use an empty string.
   *
   * This data cannot be bigger than 10 MiB.
   */
  data: string | Uint8Array;
}

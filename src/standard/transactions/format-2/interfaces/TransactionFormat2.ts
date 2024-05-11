import { Transaction as CoreTransaction } from "../../../../core/interfaces/Transaction.ts";

/**
 * A version 2 (aka format 2) transaction.
 * @see https://docs.arweave.org/developers/arweave-node-server/http-api#field-definitions
 */
export interface TransactionFormat2 extends CoreTransaction {
  /**
   * The merkle root of the transaction data. If there is no data then use an empty string.
   */
  data_root: string;

  /**
   * The size in bytes of the transactin data. Use "0" if there is no data. The string representation of the number must not exceed 21 bytes.
   */
  data_size: string;

  /**
   * The data to be submitted. The size of the data is determined by the node this transaction is sent to.
   */
  data?: string | Uint8Array;
}

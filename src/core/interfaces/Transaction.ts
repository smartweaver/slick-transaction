export interface Transaction {
  /**
   * A SHA-256 hash of the transaction signature.
   */
  id: string;

  /**
   * The full RSA modulus value of the sending wallet. The modulus is the n value from the JWK. The RSA public key.
   */
  owner: string;

  /**
   * The transaction fee.
   */
  reward: string;

  /**
   * An RSA signature of a merkle root of the SHA-384 hashes of transaction fields (except for id, which is the hash of the signature).
   */
  signature: string;

  /**
   * Alias for this transaction's format version number. For example, `format: 2` means this transaction is a Version 2 transaction.
   */
  format: number;

  /**
   * An anchor - a protection against replay attacks. It may be either a hash of one of the last 50 blocks or the last outgoing transaction ID from the sending wallet.
   */
  last_tx: string;

  /**
   * The amount to transfer from the owner wallet to the target wallet address (if required).
   */
  quantity: string;

  /**
   * A list of name-value pairs, each pair is serialized as `{"name": "a BaseURL string", "value":" "a Base64URL string" }`. If no tags are being used then use an empty array []. The total size of the names and values may not exceed 2048 bytes. Tags might be useful for attaching a message to a transaction sent to another wallet, for example a reference number or identifier to help account for the transaction.
   */
  tags: { name: string; value: string }[];

  /**
   * The target address to send tokens to (if required). If no tokens are being transferred to another wallet then use an empty string. Note that sending tokens to the owner address is not supported. The address is the SHA-256 hash of the RSA public key.
   */
  target: string;
}

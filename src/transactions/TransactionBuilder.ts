import { TransferTransaction } from "./TransferTransaction.ts";
import { ArweaveDecorator } from "../decorators/ArweaveDecorator.ts";
import { BundleTransaction } from "./BundleTransaction.ts";
import { Arweave } from "../../deps.ts";
import { Transaction } from "./Transaction.ts";

class TransactionBuilderWithArweave extends ArweaveDecorator {
  /**
   * Access the bundle transaction builder. This builder only lets you set
   * @returns
   */
  transaction() {
    return new Transaction(this.arweave);
  }

  /**
   * Access the AR transfer transaction builder. This builder only lets you set
   * an AR quantity and the receiver of the AR.
   * @returns The AR transfer transaction builder.
   */
  transfer() {
    return new TransferTransaction(this.arweave);
  }

  /**
   * Access the bundle transaction builder. This builder only lets you set
   * @returns
   */
  bundle() {
    return new BundleTransaction(this.arweave);
  }
}

export class TransactionBuilder {
  /**
   * Provide an `Arweave` instance that the transaction builders will use.
   * @param arweave An {@linkcode Arweave} instance.
   * @returns The transaction builder with the `Arweave` instance as a
   * decorated object.
   */
  arweaveInstance(arweave: Arweave) {
    return new TransactionBuilderWithArweave(arweave);
  }
}

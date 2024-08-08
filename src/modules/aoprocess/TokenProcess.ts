import { DryRun as CuDryRun } from "../aoconnect/units/compute/DryRun.ts";
import { Message as MuMessage } from "../aoconnect/units/messenger/Message.ts";
import { Process } from "./Process.ts";

type Message = Omit<MuMessage, "process">
type DryRun = Omit<CuDryRun, "process">

export type TokenActions =
  | "Balance"
  | "Balances"
  | "Burn"
  | "Info"
  | "Mint"
  | "Transfer";

export class TokenProcess<
  Actions extends string = "",
> extends Process<Actions | TokenActions> {
  /**
   * Send a `Action = "Balance"` message.
   *
   * @param target The target balance in question.
   * @returns The action builder. You can call `.post()` on it to send it.
   */
  balance(target: string): DryRun {
    return this
      .dryRun("Balance")
      .tags({
        Target: target,
      })
  }

  /**
   * Send a `Action = "Balances"` message.
   *
   * @returns The action builder. You can call `.post()` on it to send it.
   */
  balances(): DryRun {
    return this
      .dryRun("Balances")
  }

  /**
   * Get the action builder for the `Action = "Burn"` message.
   *
   * @param target The target in question.
   * @param quantity The quantity in question.
   * @returns The action builder. You can call `.post()` on it to send it.
   *
   * @example
   * ```ts
   * import * as aoconnect from "@permaweb/aoconnect";
   * import { TokenProcess } from "@smartweaver/slick-transaction/modules/processes/TokenProcess"
   *
   * const token = new TokenProcess(aoconnect, "1557");
   *
   * const result = token
   *   .burn(target: string, quantity: string)
   *   .tags({ "Some-Optional-Tag": "some value" })
   *   .dataItemSigner(() => {
   *     // ... code that aoconnect should use to sign this `DataItem`
   *   })
   *   .post();
   *
   * // - end of example -
   * ```
   */
  burn(target: string, quantity: string) {
    return this
      .action("Burn")
      .tags({
        Target: target,
        Quantity: quantity,
      });
  }

  /**
   * Send a `Action = "Info"` message.
   *
   * @returns The info result.
   */
  info() {
    return this
      .dryRun("Info")
      .post();
  }

  /**
   * Get the action builder for the `Action = "Mint"` message.
   *
   * @param target The target in question.
   * @param quantity The quantity in question.
   * @returns The action builder. You can call `.post()` on it to send it.
   *
   * @example
   * ```ts
   * import * as aoconnect from "@permaweb/aoconnect";
   * import { TokenProcess } from "@smartweaver/slick-transaction/modules/processes/TokenProcess"
   *
   * const token = new TokenProcess(aoconnect, "1557");
   *
   * const result = token
   *   .mint(target: string, quantity: string)
   *   .tags({ "Some-Optional-Tag": "some value" })
   *   .dataItemSigner(() => {
   *     // ... code that aoconnect should use to sign this `DataItem`
   *   })
   *   .post();
   *
   * // - end of example -
   * ```
   */
  mint(target: string, quantity: string): Message {
    return this
      .action("Mint")
      .tags({
        Target: target,
        Quantity: quantity,
      });
  }

  /**
   * Get the action builder for the `Action = "Transfer"` message.
   *
   * @param recipient The recipient in question.
   * @param quantity The quantity in question.
   * @returns The action builder. You can call `.post()` on it to send it.
   *
   * @example
   * ```ts
   * import * as aoconnect from "@permaweb/aoconnect";
   * import { TokenProcess } from "@smartweaver/slick-transaction/modules/processes/TokenProcess"
   *
   * const token = new TokenProcess(aoconnect, "1557");
   *
   * const result = token
   *   .transfer(recipient: string, quantity: string)
   *   .tags({ "Some-Optional-Tag": "some value" })
   *   .dataItemSigner(() => {
   *     // ... code that aoconnect should use to sign this `DataItem`
   *   })
   *   .post();
   *
   * // - end of example -
   * ```
   */
  transfer(recipient: string, quantity: string) {
    return this
      .action("Transfer")
      .tags({
        Recipient: recipient,
        Quantity: quantity,
      });
  }
}

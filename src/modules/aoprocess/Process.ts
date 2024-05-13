import { Client } from "../aoconnect/Client.ts";
import { AoConnect } from "../aoconnect/interfaces/AoConnect.ts";

export class Process<Actions extends string = any> {
  protected client: Client;
  protected process_id: string;

  constructor(aoconnect: AoConnect, processId: string) {
    this.client = new Client(aoconnect);
    this.process_id = processId;
  }

  /**
   * Get an action request builder for the given action.
   *
   * @param action The name of the action to build the message for.
   * @returns The action builder -- predefined with this process' ID.
   *
   * @example
   * ```ts
   * // Get the process client -- targeting process ID "1557"
   * const proc = new Process(aoconnect, "1557");
   *
   * // Build the action request
   * const action = proc
   *   .action("some optional anchor")
   *   .dataItemSigner(() => {
   *     // ... code that aoconnect should use to sign this `DataItem`
   *   })
   *   .data("optional data")
   *   .tags({
   *     "Some-Optional-Tag": "some value",
   *   })
   *
   * // Send the action
   * const messageId = await action.post();
   *
   * // - end of example -
   * ```
   */
  action(action: Actions) {
    return this.client
      .mu()
      .message()
      // Set up the action to be sent to this process
      .process(this.process_id)
      // Ensure this message is set up to send this specific action
      .tags({ Action: action });
  }

  /**
   * Get DryRun message request builder for the given action.
   *
   * @param action The name of the action to build the DryRun message for.
   * @returns The DryRun message builder - predefined with this process' ID.
   */
  dryRun(action: Actions) {
    return this.client
      .cu()
      .dryRun()
      .process(this.process_id)
      .tags({ Action: action });
  }

  /**
   * Get the result of the message with the given ID.
   *
   * @returns The message's result.
   *
   * @example
   * ```ts
   * // Get the process client -- targeting process ID "1557"
   * const proc = new Process(aoconnect, "1557");
   *
   * // Get the result of message "1447"
   * const result = await proc.message("1447");
   *
   * // - end of example -
   * ```
   */
  message(messageId: string) {
    return this.client
      .cu()
      .result()
      .message(messageId)
      .process(this.process_id)
      .get();
  }

  /**
   * Get the results request builder for this process.
   *
   * @returns The results builder -- predefined with this process' ID.
   *
   * @example
   * ```ts
   * // Get the process client -- targeting process ID "1557"
   * const proc = new Process(aoconnect, "1557");
   *
   * // Build the results query
   * const query = proc
   *   .results()
   *   .from("optional 'from' starting point cursor")
   *   .to("optional 'to' ending point cursor")
   *   .limit(15) // Optional number of results to return
   *   .sort("DESC") // Optional sort order of the results when they are returned
   *
   * // Send the query
   * const results = await query.post();
   *
   * // - end of example -
   * ```
   */
  results() {
    return this.client.cu().results().process(this.process_id);
  }
}

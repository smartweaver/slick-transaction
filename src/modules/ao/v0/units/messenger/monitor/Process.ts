import { MessengerUnit } from "../../../interfaces/MessengerUnit.ts";

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{mu-url}/monitor/{process-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Process {
  protected messenger_unit: MessengerUnit;
  protected process_id: string;

  constructor(messengerUnit: MessengerUnit, processId: string) {
    this.messenger_unit = messengerUnit;
    this.process_id = processId;
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     DELETE {mu-url}/monitor/{process-id}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new MessengerUnit()
   *   .monitor()
   *   .process("1557")
   *   .delete({
   *     body: new TextEncoder().encode(JSON.stringify({})),
   *   });
   *
   * // - end of example -
   * ```
   */
  delete(options: RequestInit): Promise<{ message: string }> {
    // Ensure defaults
    options = {
      ...(options || {}),
      headers: {
        "content-type": "application/octet-stream",
        "accept": "application/json",
        ...(options.headers || {}),
      },
      redirect: options.redirect || "follow",
      method: "DELETE",
    };

    const req = this.messenger_unit
      .fetch(`/monitor/${this.process_id}`, options);

    return req.then((res) => res.json());
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     POST {mu-url}/monitor/{process-id}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new MessengerUnit()
   *   .monitor()
   *   .process("1557")
   *   .post({
   *     body: new TextEncoder().encode(JSON.stringify({})),
   *   });
   *
   * // - end of example -
   * ```
   */
  post(options: RequestInit): Promise<{ message: string }> {
    // Ensure defaults
    options = {
      ...(options || {}),
      headers: {
        "content-type": "application/octet-stream",
        "accept": "application/json",
        ...(options.headers || {}),
      },
      redirect: options.redirect || "follow",
      method: "POST",
    };

    const req = this.messenger_unit
      .fetch(`/monitor/${this.process_id}`, options);

    return req.then((res) => res.json());
  }
}

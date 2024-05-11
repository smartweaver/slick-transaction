import { hasParams, kvpToQueryParamsString } from "../../utils/FetchUtils.ts";
import { Scheduler } from "../Scheduler.ts";

export type GetRequestOptions = {
  query: {
    /** The target process' ID. */
    ["process-id"]: string;
  };
} & RequestInit;

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{su-url}/{message-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Message {
  protected message_id: string;
  protected scheduler_unit: Scheduler;

  constructor(schedulerUnit: Scheduler, messageId: string) {
    this.scheduler_unit = schedulerUnit;

    if (!messageId) {
      throw new Error(`Cannot fetch message without Message ID`);
    }

    this.message_id = messageId;
  }

  /**
   * Make the following request(s):
   * ```text
   *     GET {su-url}/{message-id}?process-id={process-id}
   * ```
   * @param options Options to pass to the request.
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new SchedulerUnit()
   *   .message("1447")
   *   .get({ query: { "process-id": "1557" } });
   *
   * // - end of example -
   * ```
   */
  get(options: GetRequestOptions): Promise<Message> {
    const result = hasParams(options?.query, ["process-id"]);

    if (result.has_missing_params) {
      throw new Error(
        `Cannot fetch message. URL query params are missing: ${result.missing}.`,
      );
    }

    const queryString = kvpToQueryParamsString(options?.query);

    return this.scheduler_unit
      .fetch(`/${this.message_id}${queryString}`, options)
      .then((res) => res.json());
  }
}

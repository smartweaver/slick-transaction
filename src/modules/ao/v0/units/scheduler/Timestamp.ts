import { UnitTimestamp } from "../../types/UnitTimestamp.ts";
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
 * - `{su-url}/timestamp`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Timestamp {
  protected scheduler_unit: Scheduler;

  constructor(schedulerUnit: Scheduler) {
    this.scheduler_unit = schedulerUnit;
  }

  /**
   * Make the following request(s):
   * ```text
   *     GET {su-url}/timestamp?process-id={process-id}
   * ```
   * @returns The result of the request.
   * @example
   * ```ts
   * const res = await new SchedulerUnit()
   *   .timestamp()
   *   .get({ query: { "process-id": "1557" } })
   *
   * // - end of example -
   * ```
   */
  get(options: GetRequestOptions): Promise<UnitTimestamp> {
    const result = hasParams(options?.query, ["process-id"]);

    if (result.has_missing_params) {
      throw new Error(
        `Cannot fetch message. URL query params are missing: ${result.missing}.`,
      );
    }

    const queryString = kvpToQueryParamsString(options?.query);

    return this.scheduler_unit
      .fetch(`/timestamp${queryString}`, options)
      .then((res) => res.json());
  }
}

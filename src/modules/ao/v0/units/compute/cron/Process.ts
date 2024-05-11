import { HTTPResponse } from "../../../types/HTTPResponse.ts";
import { kvpToQueryParamsString } from "../../../utils/FetchUtils.ts";
import { Compute } from "../../Compute.ts";

export type GetRequestOptions = {
  query: {
    from?: string;
    to?: string;
  };
} & RequestInit;

export type GetResponse = HTTPResponse.PaginatedResponse<{
  // TODO(crookse) Finish typing
  Messages: any[];
  Spawns: [];
  Output: any;
}>;

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/cron/{process-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class CronProcess {
  protected process_id: string;
  protected unit: Compute;

  constructor(unit: Compute, processId: string) {
    this.unit = unit;

    if (!processId) {
      throw new Error(`Cannot fetch message without Process ID`);
    }

    this.process_id = processId;
  }

  /**
   * Make the following request(s):
   * ```text
   *     GET {cu-url}/cron/{process-id}
   *     GET {cu-url}/cron/{process-id}?from={timestamp}&to={timestamp}
   * ```
   * @param options Options to pass to this request.
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit()
   *   .cron()
   *   .process("1447")
   *   .get({ query: { from: "1715039710324", to: "1715039720324" } });
   *
   * // - end of example -
   * ```
   */
  get(options: GetRequestOptions): Promise<GetResponse> {
    const queryString = kvpToQueryParamsString(options?.query);

    return this.unit
      .fetch(`/cron/${this.process_id}${queryString}`)
      .then((res) => res.json());
  }
}

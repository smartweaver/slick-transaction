import { kvpToQueryParamsString } from "../../../utils/FetchUtils.ts";
import { Compute } from "../../Compute.ts";

export type GetRequestOptions = {
  query: {
    /** If this is not provided, the Compute Unit will evaluate the process up to the most recent Message. */
    to?: string;
  };
} & RequestInit;

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/state/{process-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Process {
  protected process_id: string;
  protected compute_unit: Compute;

  constructor(compute_unit: Compute, processId: string) {
    this.compute_unit = compute_unit;

    if (!processId) {
      throw new Error(`Cannot fetch message without Process ID`);
    }

    this.process_id = processId;
  }

  /**
   * Make the following request(s):
   * ```text
   *     GET {cu-url}/state/{process-id}
   *     GET {cu-url}/state/{process-id}?to={timestamp}
   * ```
   * @param options Options to pass to this request.
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit()
   *   .state()
   *   .process("1447")
   *   .get({ query: { "to": "1712967091755" } });
   *
   * // - end of example -
   * ```
   */
  get(options: GetRequestOptions): Promise<any> {
    const queryString = kvpToQueryParamsString(options?.query);

    const req = this.compute_unit
      .fetch(`/state/${this.process_id}${queryString}`);

    return req.then((res) => res.json());
  }
}

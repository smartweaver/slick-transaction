import { kvpToQueryParamsString } from "../../../utils/FetchUtils.ts";
import {
  AbstractProcess,
  GetRequestOptions,
  GetResponse,
} from "./AbstractProcess.ts";

export class Process extends AbstractProcess {
  /**
   * Make the following request(s):
   * ```text
   *     GET {cu-url}/results/{process-id}
   *     GET {cu-url}/results/{process-id}?from={timestamp}&to={timestamp}&limit={limit}&sort={"ASC"|"DESC"}
   * ```
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit()
   *   .results()
   *   .process("1447")
   *   .get({ query: { from: "", to: "", sort: "ASC", limit: 25 } });
   *
   * // - end of example -
   * ```
   *
   * @link [Example URL](https://cu68.ao-testnet.xyz/results/91rtZiRskK4sy4aIDir-waISHDUno3v1MwctlbMpAkg)
   */
  get(options: GetRequestOptions): Promise<GetResponse> {
    const queryString = kvpToQueryParamsString(options?.query);

    return this.compute_unit
      .fetch(`/results/${this.process_id}${queryString}`)
      .then((res) => res.json());
  }
}

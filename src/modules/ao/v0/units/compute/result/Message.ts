import {
  hasParams,
  kvpToQueryParamsString,
} from "../../../utils/FetchUtils.ts";
import {
  AbstractMessage,
  GetRequestOptions,
  GetResponse,
} from "./AbstractMessage.ts";

export class Message extends AbstractMessage {
  /**
   * Make the following request(s):
   * ```text
   *     GET {cu-url}/result/{message-id}?process-id={process-id}
   * ```
   * @param options Options to pass to the request.
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit()
   *   .result()
   *   .message("1447")
   *   .get({ query: { "process-id": "1557" } });
   *
   * // - end of example -
   * ```
   *
   * @link [Example URL](https://cu68.ao-testnet.xyz/result/nmrwM1i0InBqpIUHyHVrnW4o9rIgKagCLx5CPev0CJQ?process-id=91rtZiRskK4sy4aIDir-waISHDUno3v1MwctlbMpAkg)
   */
  get(options: GetRequestOptions): Promise<GetResponse> {
    const result = hasParams(options?.query, ["process-id"]);

    if (result.has_missing_params) {
      throw new Error(
        `Cannot fetch message. URL query params are missing: ${result.missing}.`,
      );
    }

    const queryString = kvpToQueryParamsString(options?.query);

    return this.compute_unit
      .fetch(`/result/${this.message_id}${queryString}`)
      .then((res) => res.json());
  }
}

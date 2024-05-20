import { hasParams, kvpToQueryParamsString } from "../../utils/FetchUtils.ts";
import {
  AbstractDryRun,
  PostOptions,
  PostResponse,
} from "./AbstractDryRun.ts";

export class DryRun extends AbstractDryRun {
  /**
   * Make the following request(s):
   * ```text
   *     GET {cu-url}/dry-run?process-id={process-id}
   * ````
   * @param options (Optional) Options to pass to the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit()
   *   .dryRun()
   *   .process("1557")
   *   .post({ query: "process-id": "1557" });
   *
   * // - end of example -
   * ```
   */
  post(
    options: PostOptions,
  ): Promise<PostResponse> {
    const result = hasParams(options?.query, ["process-id"]);

    const fetchOptions = {
      ...(options || {}),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        ...(options.headers || {}),
      },
      redirect: options.redirect || "follow",
      method: "POST",
    };

    if (result.has_missing_params) {
      throw new Error(
        `Cannot send DryRun. URL query params are missing: ${result.missing}.`,
      );
    }

    const queryString = kvpToQueryParamsString(options?.query);

    return this.compute_unit
      .fetch(`/dry-run${queryString}`, fetchOptions)
      .then((res) => res.json());
  }
}

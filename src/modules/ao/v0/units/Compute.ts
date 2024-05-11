import { UnitInfo } from "../types/UnitInfo.ts";
import { Cron } from "./compute/Cron.ts";
import { DryRun } from "./compute/DryRun.ts";
import { Result } from "./compute/Result.ts";
import { Results } from "./compute/Results.ts";
import { State } from "./compute/State.ts";

const defaultCuUrl = "https://cu.ao-testnet.xyz";

/**
 * This class is responsible for interacting with Compute Unit API endpoints.
 *
 * For more information on this API's endpoints, see the following:
 *
 * - https://ao.g8way.io/#/spec > Compute (CU)
 */
export class Compute {
  /**
   * The URL to this unit. Examples:
   *
   * - https://cu.ao-testnet.xyz
   * - https://cu68.ao-testnet.xyz
   */
  protected cu_url = defaultCuUrl;

  /**
   * @param cuUrl (Optional) The URL to this unit. Can be a Scheduler
   * Unit URL or a unit Router URL.
   *
   * Defaults to the following unit Router URL:
   *
   * https://su-router.ao-testnet.xyz.
   */
  constructor(cuUrl?: string) {
    this.cu_url = cuUrl || defaultCuUrl;
  }

  /**
   * Make a `fetch` request using this unit's URL as the request's
   * base URL.
   * @param path The path to append to this unit's base URL.
   * @param requestInit (Optional) Options to pass to the `fetch` API.
   * @returns The result of the `fetch` call.
   */
  fetch(path: string, requestInit: RequestInit = {}) {
    if (!this.cu_url) {
      throw new Error(
        `Cannot fetch from Compute Unit without Compute Unit URL`,
      );
    }

    const fullUrl = this.cu_url + path;

    return fetch(fullUrl, requestInit);
  }

  /**
   * @returns See {@linkcode DryRun}.
   */
  dryRun() {
    return new DryRun(this);
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     GET {cu-url}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new ComputeUnit().get();
   *
   * // - end of example -
   * ```
   */
  get(): Promise<UnitInfo> {
    return this.fetch("/").then((res) => res.json());
  }

  /**
   * @returns See {@linkcode Result}.
   */
  result() {
    return new Result(this);
  }

  /**
   * @returns See {@linkcode Results}.
   */
  results() {
    return new Results(this);
  }

  /**
   * @returns See {@linkcode Cron}.
   */
  cron() {
    return new Cron(this);
  }

  /**
   * @returns See {@linkcode State}.
   */
  state() {
    return new State(this);
  }
}

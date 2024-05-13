import {
  GetOptions,
  MessengerUnit,
  PostOptions,
} from "../interfaces/MessengerUnit.ts";
import { UnitInfo } from "../types/UnitInfo.ts";
import { kvpToQueryParamsString } from "../utils/FetchUtils.ts";
import { Monitor } from "./messenger/Monitor.ts";

const defaultMuUrl = "https://mu.ao-testnet.xyz";

/**
 * This class is responsible for interacting with Messenger Unit API endpoints.
 *
 * For more information on this API's endpoints, see the following:
 *
 * - https://ao.g8way.io/#/spec > Messenger (MU)
 */
export class Messenger implements MessengerUnit {
  /**
   * The URL to this unit. Examples:
   *
   * - https://mu.ao-testnet.xyz
   * - https://mu24.ao-testnet.xyz
   */
  protected mu_url = defaultMuUrl;

  /**
   * @param muUrl (Optional) The URL to this unit. Can be a Scheduler
   * Unit URL or a unit Router URL.
   *
   * Defaults to the following unit Router URL:
   *
   * https://su-router.ao-testnet.xyz.
   */
  constructor(muUrl?: string) {
    this.mu_url = muUrl || defaultMuUrl;
  }

  fetch(path: string, requestInit: RequestInit = {}) {
    if (!this.mu_url) {
      throw new Error(
        `Cannot fetch from Messenger Unit without Messenger Unit URL`,
      );
    }

    const fullUrl = this.mu_url + path;

    return fetch(fullUrl, requestInit);
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     GET {mu-url}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new MessengerUnit().get();
   *
   * // - end of example -
   * ```
   */
  get(options: GetOptions): Promise<UnitInfo> {
    const query = options?.query || {};

    const kvp: Record<string, string> = {};

    if (query.process) {
      kvp.process = query.process;
    }

    if (query.message) {
      kvp.message = query.message;
    }

    if (typeof query.debug === "boolean") {
      kvp.debug = `${query.debug}`;
    }

    if (typeof query["page-size"] === "number") {
      kvp["page-size"] = `${query["page-size"]}`;
    }

    if (typeof query.page === "number") {
      kvp.page = `${query.page}`;
    }

    const queryString = kvpToQueryParamsString(kvp);

    const req = this.fetch(`/${queryString}`).then((res) => res.json());

    return req.then((res) => res.json());
  }

  /**
   * @returns See {@linkcode Monitor}
   */
  monitor() {
    return new Monitor(this);
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     POST {mu-url}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new MessengerUnit()
   *   .post({
   *     body: new TextEncoder().encode(JSON.stringify({}))
   *   });
   *
   * // - end of example -
   * ```
   */
  post(options: PostOptions): Promise<string> {
    if (!options.body) {
      throw new Error("Cannot send POST request without body");
    }

    // Ensure defaults
    const fetchOptions = {
      ...(options || {}),
      headers: {
        "content-type": "application/octet-stream",
        "accept": "application/json",
        ...(options.headers || {}),
      },
      redirect: options.redirect || "follow",
      method: "POST",
    };

    const req = this.fetch("/", fetchOptions);

    return req.then((res) => res.json());
  }
}

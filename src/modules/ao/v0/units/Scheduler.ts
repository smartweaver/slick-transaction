import { UnitInfo } from "../types/UnitInfo.ts";
import { Message } from "./scheduler/Message.ts";
import { Process } from "./scheduler/Process.ts";
import { Processes } from "./scheduler/Processes.ts";
import { Timestamp } from "./scheduler/Timestamp.ts";

const defaultSuUrl = "https://su-router.ao-testnet.xyz";

/**
 * This class is responsible for interacting with Scheduler Unit API endpoints.
 *
 * For more information on this API's endpoints, see the following:
 *
 * - https://ao.g8way.io/#/spec > Scheduler (SU)
 */
export class Scheduler {
  /**
   * The URL to this unit. Examples:
   *
   * - https://su-router.ao-testnet.xyz
   * - https://su55.ao-testnet.xyz
   */
  protected su_url = defaultSuUrl;

  /**
   * @param suUrl (Optional) The URL to this unit. Can be a Scheduler
   * Unit URL or a unit Router URL.
   *
   * Defaults to the following unit Router URL:
   *
   * https://su-router.ao-testnet.xyz.
   */
  constructor(suUrl?: string) {
    this.su_url = suUrl || defaultSuUrl;
  }

  /**
   * Make a `fetch` request using this unit's URL as the request's
   * base URL.
   * @param path The path to append to this unit's base URL.
   * @param requestInit (Optional) Options to pass to the `fetch` API.
   * @returns The result of the `fetch` call.
   */
  fetch(path: string, requestInit: RequestInit = {}) {
    if (!this.su_url) {
      throw new Error(
        `Cannot fetch from Scheduler Unit without Scheduler Unit URL`,
      );
    }

    const fullUrl = this.su_url + path;

    return fetch(fullUrl, requestInit);
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     GET {su-url}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new SchedulerUnit().get();
   *
   * // - end of example -
   * ```
   */
  get(): Promise<UnitInfo> {
    return this.fetch("/").then((res) => res.json());
  }

  /**
   * Make the following request(s):
   *
   * ```text
   *     POST {su-url}
   * ```
   *
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new SchedulerUnit()
   *   .post({
   *     // ... body of the request
   *   });
   *
   * // - end of example -
   * ```
   */
  post(options: RequestInit): Promise<{ id: string; timestamp: string }> {
    const req = this.fetch("/", {
      ...options,
      method: "POST",
    });

    return req.then((res) => res.json());
  }

  /**
   * @returns See {@linkcode Message}.
   */
  message(messageId: string) {
    return new Message(this, messageId);
  }

  /**
   * @returns See {@linkcode Process}.
   */
  process(processId: string) {
    return new Process(this, processId);
  }

  /**
   * @returns See {@linkcode Processes}.
   */
  processes() {
    return new Processes(this);
  }

  /**
   * @returns See {@linkcode Timestamp}.
   */
  timestamp() {
    return new Timestamp(this);
  }
}

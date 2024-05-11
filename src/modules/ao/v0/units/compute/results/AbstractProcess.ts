import { Result } from "../../../types/Result.ts";
import { Compute } from "../../Compute.ts";

export interface Process {
  /**
   * Get the results from the process.
   * @param options Options to pass to the request.
   * @returns The result of the request.
   */
  get(options: GetRequestOptions): Promise<GetResponse>;
}

export type GetRequestOptions = {
  query: {
    from?: string;
    limit?: string;
    sort?: "ASC" | "DESC";
    to?: string;
  };
};

/**
 * @example
 * ```json
 * {
 *   "pageInfo": {
 *     "hasNextPage": true
 *   },
 *   "edges": [
 *     {
 *       "node": {
 *         "Messages": [],
 *         "Assignments": [],
 *         "Spawns": [],
 *         "Output": {
 *           "prompt": "aos\u003E ",
 *           "data": "{\"price\":40.24,\"currency_id\":\"wAR-TST\"}",
 *           "print": true
 *         }
 *       },
 *       "cursor": "eyJ0aW1lc3RhbXAiOjE3MTUwNzk4MTM5ODIsIm9yZGluYXRlIjoiMTAwMTciLCJjcm9uIjpudWxsLCJzb3J0IjoiQVNDIn0="
 *     },
 *     {
 *       "node": {
 *         "Messages": [],
 *         "Assignments": [],
 *         "Spawns": [],
 *         "Output": {
 *           "prompt": "aos\u003E ",
 *           "data": "{\"price\":40.38,\"currency_id\":\"wAR-TST\"}",
 *           "print": true
 *         }
 *       },
 *       "cursor": "eyJ0aW1lc3RhbXAiOjE3MTUwNzk4NzM5MTUsIm9yZGluYXRlIjoiMTAwMTgiLCJjcm9uIjpudWxsLCJzb3J0IjoiQVNDIn0="
 *     }
 *   ]
 * }
 * ```
 */
export type GetResponse = {
  pageInfo: { hasNextPage: boolean };
  edges: { cursor: string; node: Result }[];
};

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/results/{process-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export abstract class AbstractProcess implements Process {
  protected compute_unit: Compute;

  protected process_id: string;

  constructor(computeUnit: Compute, processId: string) {
    this.compute_unit = computeUnit;

    if (!processId) {
      throw new Error(`Cannot fetch message without Process ID`);
    }

    this.process_id = processId;
  }

  abstract get(options: GetRequestOptions): Promise<GetResponse>;
}

import { DryRunResult } from "../../types/DryRunResult.ts";
import { Compute } from "../Compute.ts";

export interface DryRun {
  /**
   * Send a DryRun request to a process.
   *
   * @param options Options to pass to the request.
   */
  post(options: PostRequestOptions): Promise<PostResponse>;
}

export type PostRequestOptions = {
  query: {
    "process-id": string;
  };
};

export type PostResponse = DryRunResult;

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/dry-run`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export abstract class AbstractDryRun implements DryRun {
  protected compute_unit: Compute;

  constructor(computeUnit: Compute) {
    this.compute_unit = computeUnit;
  }

  abstract post(options: PostRequestOptions): Promise<PostResponse>;
}

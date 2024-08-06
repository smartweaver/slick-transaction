import { DryRunResult } from "../../types/DryRunResult.ts";
import { Compute } from "../Compute.ts";

export interface DryRun {
  /**
   * Send a DryRun request to a process.
   *
   * @param options Options to pass to the request.
   */
  post(options: PostOptions): Promise<PostResponse>;
}

export type PostOptions = {
  query: {
    "process-id": string;
  };
} & RequestInit;

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

  abstract post(options: PostOptions): Promise<PostResponse>;
}

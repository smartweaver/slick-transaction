import { Compute } from "../Compute.ts";
import { Process } from "./results/Process.ts";

export interface Results {
  /**
   * Get the object that interacts with the process with the given ID.
   * @param process The process' ID.
   * @returns An object with HTTP-like APIs for interacting with the process.
   */
  process(processId: string): Process;
}

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/results/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Results implements Results {
  protected compute_unit: Compute;

  constructor(computeUnit: Compute) {
    this.compute_unit = computeUnit;
  }

  process(processId: string) {
    return new Process(this.compute_unit, processId);
  }
}

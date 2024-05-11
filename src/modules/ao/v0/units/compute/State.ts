import { Compute } from "../Compute.ts";
import { Process } from "./state/Process.ts";

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/state/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class State {
  protected unit: Compute;

  constructor(unit: Compute) {
    this.unit = unit;
  }

  /**
   * Get the object that interacts with the process with the given ID.
   * @param processId The process' ID.
   * @returns An object with HTTP-like APIs for interacting with the process.
   */
  process(processId: string) {
    return new Process(this.unit, processId);
  }
}

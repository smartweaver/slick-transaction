import { Compute } from "../Compute.ts";
import { CronProcess } from "./cron/Process.ts";

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/cron/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Cron {
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
    return new CronProcess(this.unit, processId);
  }
}

import { Scheduler } from "../Scheduler.ts";
import { Process } from "./processes/Process.ts";

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{su-url}/processes/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Processes {
  protected scheduler_unit: Scheduler;

  constructor(schedulerUnit: Scheduler) {
    this.scheduler_unit = schedulerUnit;
  }

  /**
   * Get the object that interacts with the process with the given ID.
   * @param processId The process' ID.
   * @returns An object with HTTP-like APIs for interacting with the process.
   */
  process(processId: string) {
    return new Process(this.scheduler_unit, processId);
  }
}

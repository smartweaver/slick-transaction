import { MessengerUnit } from "../../interfaces/MessengerUnit.ts";
import { Process } from "./monitor/Process.ts";

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{mu-url}/monitor/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Monitor {
  protected messenger_unit: MessengerUnit;

  constructor(messengerUnit: MessengerUnit) {
    this.messenger_unit = messengerUnit;
  }

  /**
   * @param processId The ID of the process to monitor.
   * @returns See {@linkcode Process}
   */
  process(processId: string) {
    return new Process(this.messenger_unit, processId);
  }
}

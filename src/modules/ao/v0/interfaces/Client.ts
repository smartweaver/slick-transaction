import { Compute } from "../units/Compute";
import { Messenger } from "../units/Messenger";
import { Scheduler } from "../units/Scheduler";

export interface Client {
  /**
   * Get the object to interact with a Compute Unit.
   */
  cu(): Compute;

  /**
   * Get the object to interact with a Messenger Unit.
   */
  mu(): Messenger;

  /**
   * Get the object to interact with a Scheduler Unit.
   */
  su(): Scheduler;
}

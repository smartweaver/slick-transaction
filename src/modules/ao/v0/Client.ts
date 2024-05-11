import { Client as IClient } from "./interfaces/Client.ts";
import { Compute } from "./units/Compute.ts";
import { Messenger } from "./units/Messenger.ts";
import { Scheduler } from "./units/Scheduler.ts";

export class Client implements IClient {
  /**
   * Access the Compute Unit methods.
   *
   * @param cuUrl (Optional) The URL to this Compute Unit. Defaults to the
   * following: https://cu.ao-testnet.xyz.
   */
  cu(cuUrl?: string) {
    return new Compute(cuUrl);
  }

  /**
   * Access the Messenger Unit methods.
   *
   * @param mUUrl (Optional) The URL to this Messenger Unit. Defaults to the
   * following: https://mu.ao-testnet.xyz.
   */
  mu(mUUrl?: string) {
    return new Messenger(mUUrl);
  }

  /**
   * Access the Scheduler Unit methods.
   *
   * @param suUrl (Optional) The URL to this Scheduler Unit. Defaults to the
   * following: https://su-router.ao-testnet.xyz.
   */
  su(suUrl?: string) {
    return new Scheduler(suUrl);
  }
}

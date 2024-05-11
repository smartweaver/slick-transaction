import { Client as BaseClient } from "../ao/v0/Client";
import { Compute } from "./units/Compute";
import { AoConnect } from "./interfaces/AoConnect";
import { Messenger } from "./units/Messenger";

export class Client extends BaseClient {
  protected aoconnect: AoConnect;

  constructor(aoconnect: AoConnect) {
    super();
    this.aoconnect = aoconnect;
  }

  /**
   * Access the Compute Unit methods.
   *
   * @returns The object to interact with a Compute Unit.
   */
  cu() {
    return new Compute(this.aoconnect);
  }

  /**
   * Access the Messenger Unit methods.
   *
   * @returns The object to interact with a Messenger Unit.
   */
  mu() {
    return new Messenger(this.aoconnect);
  }
}

/**
 * Decorate the aoconnect library's `aoconnect` object.
 * @param aoconnect The `aoconnect` object in question.
 * @returns A decorated `aoconnect` object with builder pattern APIs.
 */
export function client(aoconnect: AoConnect) {
  return new Client(aoconnect);
}

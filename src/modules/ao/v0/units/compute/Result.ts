import { Compute } from "../Compute.ts";
import { Message } from "./result/Message.ts";

export interface Result {
  /**
   * Get the object that interacts with the message with the given ID.
   * @param messageId The message's ID.
   * @returns An object with HTTP-like APIs for interacting with the message.
   */
  message(messageId: string): Message;
}

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/result/*`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Result implements Result {
  protected compute_unit: Compute;

  constructor(computeUnit: Compute) {
    this.compute_unit = computeUnit;
  }

  message(messageId: string) {
    return new Message(this.compute_unit, messageId);
  }
}

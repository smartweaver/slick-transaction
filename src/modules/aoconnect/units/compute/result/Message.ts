import { Compute } from "../../../../ao/v0/units/Compute.ts";
import { AbstractMessage } from "../../../../ao/v0/units/compute/result/AbstractMessage.ts";
import { AoConnect } from "../../../interfaces/AoConnect.ts";

export class Message extends AbstractMessage {
  protected aoconnect: AoConnect;
  protected process_id?: string;

  constructor(
    computeUnit: Compute,
    messageId: string,
    aoconnect: AoConnect,
  ) {
    super(computeUnit, messageId);
    this.aoconnect = aoconnect;
  }

  /**
   * Set the ID of the process to get the message result from.
   *
   * @param processId The process' ID.
   * @returns `this` instance for further method chaining.
   */
  process(processId: string) {
    this.process_id = processId;
    return this;
  }

  get() {
    if (!this.process_id) {
      throw new Error("Cannot get message result without Process ID");
    }

    return this.aoconnect.result({
      message: this.message_id,
      process: this.process_id,
    });
  }
}

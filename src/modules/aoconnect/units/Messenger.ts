import { Messenger as BaseMessenger } from "../../ao/v0/units/Messenger.ts";
import { Spawn } from "./messenger/Spawn.ts";
import { AoConnect } from "../interfaces/AoConnect.ts";
import { Message } from "./messenger/Message.ts";

export class Messenger extends BaseMessenger {
  protected aoconnect: AoConnect;
  protected process_id?: string;
  protected anchor_id?: string;

  constructor(aoconnect: AoConnect) {
    super();
    this.aoconnect = aoconnect;
  }

  /**
   * Access the Messenger Unit message methods.
   *
   * @returns An object containing methods to send a message to a process.
   */
  message() {
    return new Message(this.aoconnect);
  }

  /**
   * Access the Messenger Unit process spawner methods.
   *
   * @returns An object containing methods to spawn a new process.
   */
  spawn() {
    return new Spawn(this.aoconnect);
  }
}

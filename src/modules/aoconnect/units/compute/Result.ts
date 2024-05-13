import { Compute } from "../../../ao/v0/units/Compute.ts";
import { Result as BaseResult } from "../../../ao/v0/units/compute/Result.ts";
import { AoConnect } from "../../interfaces/AoConnect.ts";
import { Message } from "./result/Message.ts";

export class Result extends BaseResult {
  protected aoconnect: AoConnect;

  constructor(computeUnit: Compute, aoconnect: AoConnect) {
    super(computeUnit);
    this.aoconnect = aoconnect;
  }

  override message(messageId: string) {
    return new Message(this.compute_unit, messageId, this.aoconnect);
  }
}

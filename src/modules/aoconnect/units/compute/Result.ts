import { Compute } from "../../../ao/v0/units/Compute";
import { Result as BaseResult } from "../../../ao/v0/units/compute/Result";
import { AoConnect } from "../../interfaces/AoConnect";
import { Message } from "./result/Message";

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

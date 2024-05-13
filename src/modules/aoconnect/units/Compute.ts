import { Compute as BaseCompute } from "../../ao/v0/units/Compute.ts";
import { AoConnect } from "../interfaces/AoConnect.ts";
import { DryRun } from "./compute/DryRun.ts";
import { Result } from "./compute/Result.ts";
import { Results } from "./compute/Results.ts";

export class Compute extends BaseCompute {
  protected aoconnect: AoConnect;

  constructor(aoconnect: AoConnect) {
    super();
    this.aoconnect = aoconnect;
  }

  /**
   * Access the Compute Unit's DryRun methods.
   *
   * @returns An object containing methods to send a DryRun message to a process.
   */
  override dryRun() {
    return new DryRun(this, this.aoconnect);
  }

  /**
   * Access the Compute Unit's message result methods.
   *
   * @returns An object containing methods to get a message result from a process.
   */
  override result() {
    return new Result(this, this.aoconnect);
  }

  /**
   * Access the Compute Unit's message results methods.
   *
   * @returns An object containing methods to get message results from a process.
   */
  override results() {
    return new Results(this, this.aoconnect);
  }
}

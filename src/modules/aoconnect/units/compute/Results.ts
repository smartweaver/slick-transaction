import { Compute } from "../../../ao/v0/units/Compute.ts";
import { Results as BaseResults } from "../../../ao/v0/units/compute/Results.ts";
import { AoConnect } from "../../interfaces/AoConnect.ts";
import { Process } from "./results/Process.ts";

export class Results extends BaseResults {
  protected aoconnect: AoConnect;

  constructor(computeUnit: Compute, aoconnect: AoConnect) {
    super(computeUnit);
    this.aoconnect = aoconnect;
  }

  override process(processId: string): Process {
    return new Process(this.compute_unit, processId, this.aoconnect);
  }
}

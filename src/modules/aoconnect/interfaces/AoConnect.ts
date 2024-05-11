import * as CU from "../../ao/v0/interfaces/ComputeUnit";

export interface AoConnect {
  assign(...args: any[]): Promise<string>;
  dryrun(...args: any[]): Promise<CU.DryRun.PostResponse>;
  message(...args: any[]): Promise<string>;
  monitor(...args: any[]): Promise<string>;
  result(...args: any[]): Promise<CU.Result.Message.GetResponse>;
  results(...args: any[]): Promise<CU.Results.Process.GetResponse>; // TODO(crookse) Finish typing
  spawn(...args: any[]): Promise<string>;
  unmonitor(...args: any[]): Promise<string>;
}

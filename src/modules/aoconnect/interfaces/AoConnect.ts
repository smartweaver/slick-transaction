import { PostResponse } from "../../ao/v0/units/compute/AbstractDryRun.ts";
import { GetResponse as MessageResult } from "../../ao/v0/units/compute/result/AbstractMessage.ts";
import { GetResponse as MessageResults } from "../../ao/v0/units/compute/results/AbstractProcess.ts";

export interface AoConnect {
  assign(...args: any[]): Promise<string>;
  dryrun(...args: any[]): Promise<PostResponse>;
  message(...args: any[]): Promise<string>;
  monitor(...args: any[]): Promise<string>;
  result(...args: any[]): Promise<MessageResult>;
  results(...args: any[]): Promise<MessageResults>; // TODO(crookse) Finish typing
  spawn(...args: any[]): Promise<string>;
  unmonitor(...args: any[]): Promise<string>;
}

import { Compute } from "../../../../ao/v0/units/Compute.ts";
import {
  AbstractProcess,
  GetRequestOptions,
  GetResponse,
} from "../../../../ao/v0/units/compute/results/AbstractProcess.ts";
import { AoConnect } from "../../../interfaces/AoConnect.ts";

export class Process extends AbstractProcess {
  protected aoconnect: AoConnect;
  protected get_request_options: GetRequestOptions = { query: {} };

  constructor(
    computeUnit: Compute,
    processId: string,
    aoconnect: AoConnect,
  ) {
    super(computeUnit, processId);
    this.aoconnect = aoconnect;
  }

  /**
   * Set the number of results to return.
   *
   * @param limit The limit to pass to the request.
   * @returns `this` instance for further method chaining.
   */
  limit(limit: number) {
    this.get_request_options.query = {
      ...this.get_request_options.query,
      limit: `${limit}`,
    };

    return this;
  }

  /**
   * Set the cursor starting point.
   *
   * @param from The cursor starting point.
   * @returns `this` instance for further method chaining.
   */
  from(from: string) {
    this.get_request_options.query = {
      ...this.get_request_options.query,
      from,
    };

    return this;
  }

  /**
   * Set the cursor ending point.
   *
   * @param to The cursor ending point.
   * @returns `this` instance for further method chaining.
   */
  to(to: string) {
    this.get_request_options.query = {
      ...this.get_request_options.query,
      to,
    };

    return this;
  }

  /**
   * Set the sort order.
   *
   * @param sort The sort order to pass to the request.
   * @returns `this` instance for further method chaining.
   */
  sort(sort: "ASC" | "DESC") {
    this.get_request_options.query = {
      ...this.get_request_options.query,
      sort,
    };

    return this;
  }

  get(): Promise<GetResponse> {
    const args: any = {
      ...(this.get_request_options.query || {}),
      process: this.process_id,
    };

    if (this.get_request_options?.query?.limit) {
      args.limit = +this.get_request_options.query.limit;
    }

    return this.aoconnect.results(args);
  }
}

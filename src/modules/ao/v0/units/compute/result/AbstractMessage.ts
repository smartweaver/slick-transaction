import { Result } from "../../../types/Result.ts";
import { Compute } from "../../Compute.ts";

export type GetRequestOptions = {
  query: {
    "process-id": string;
  };
} & RequestInit;

export type GetResponse = Result;

export interface Message {
  /**
   * Get the result of a message.
   * @param options Options to pass to the request.
   * @returns The result of the request.
   */
  get(options: GetRequestOptions): Promise<GetResponse>;
}

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{cu-url}/result/{message-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export abstract class AbstractMessage implements Message {
  protected message_id: string;
  protected compute_unit: Compute;

  constructor(computeUnit: Compute, messageId: string) {
    this.compute_unit = computeUnit;

    if (!messageId) {
      throw new Error(`Cannot fetch message without Message ID`);
    }

    this.message_id = messageId;
  }

  abstract get(options: GetRequestOptions): Promise<GetResponse>;
}

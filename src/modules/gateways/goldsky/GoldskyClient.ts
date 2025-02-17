import { GoldskyGateway } from "./GoldskyGateway.ts";

export class GoldskyClient {
  /**
   * Get the Goldsky gateway instance to query transactions in Goldsky.
   * @param url The Goldsky gateway URL to use to query transactions. Defaults
   * to `https://arweave-search.goldsky.com`.
   * @returns The gateway instance.
   */
  gateway(url?: string) {
    return new GoldskyGateway(url || "https://arweave-search.goldsky.com");
  }
}

import { ArweaveGateway } from "./ArweaveGateway.ts";

export class ArweaveClient {
  /**
   * Get the gateway instance to query transactions in this gateway.
   * @param url The gateway URL to use to query transactions. Defaults
   * to `https://arweave.net`.
   * @returns The gateway instance.
   */
  gateway(url?: string) {
    return new ArweaveGateway(url || "https://arweave.net");
  }
}

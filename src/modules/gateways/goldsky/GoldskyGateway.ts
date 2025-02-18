import { GoldskyGraphQlClient } from "./GoldskyGraphQlClient.ts";

class GoldskyGatewayTypeError extends TypeError {}

export class GoldskyGateway {
  protected base_url: string;

  /**
   * @param baseUrl The gateway URL to use to query transactions.
   */
  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new GoldskyGatewayTypeError(
        "Argument `baseUrl: string` is required",
      );
    }

    this.base_url = baseUrl;
  }

  get configs() {
    return {
      base_url: this.base_url,
    };
  }

  graphql() {
    return new GoldskyGraphQlClient(this.base_url);
  }
}

import { NetworkInfo } from "../../../standard/gateways/types/NetworkInfo.ts";
import { TransactionStatus } from "../../../standard/gateways/types/TransactionStatus.ts";
import {
  QueryTransactionsArgs,
  TransactionEdgeNode,
} from "../../../standard/grahpql/types/Schema.ts";
import { ArweaveGraphQlClient } from "./ArweaveGraphQlClient.ts";

class GatewayTypeError extends TypeError {}

export class ArweaveGateway {
  protected base_url: string;

  /**
   * @param baseUrl The gateway URL to use to query transactions.
   */
  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new GatewayTypeError(
        "Argument `baseUrl: string` is required",
      );
    }

    this.base_url = baseUrl;
  }

  /**
   * Query the `/wallet/<address>/balance` endpoint to get the provided
   * `address` balance.
   * @param address The address in question.
   * @returns The address' balance.
   */
  balance(address: string): Promise<string> {
    if (typeof address !== "string") {
      throw new GatewayTypeError(
        "Argument `address: string` is required",
      );
    }

    const query = fetch(this.base_url + "/wallet/" + address + "/balance");

    return query.then((res) => res.text());
  }

  /**
   * Get this gateway's GraphQL client instance that interacts with this
   * gateway's `/graphql` endpoint/
   * @returns This gateway's GraphQL client instance.
   */
  graphql() {
    return new ArweaveGraphQlClient(this.base_url + "/grahpql");
  }

  /**
   * Query the `/info` endpoint.
   * @returns This gateway's information.
   */
  info(): Promise<NetworkInfo> {
    return fetch(this.base_url + "/info").then((res) => res.json());
  }

  /**
   * Query the `/tx/<tx-id>` endpoint to get the transaction with the provided
   * `txId`.
   * @param address The transaction's ID.
   * @returns The transaction  or `Not Found.` if the transaction cannot
   * be found in this gateway.
   */
  tx(txId: string): Promise<TransactionStatus | string> {
    if (typeof txId !== "string") {
      throw new GatewayTypeError(
        "Argument `txId: string` is required",
      );
    }

    const query = fetch(this.base_url + "/tx/" + txId + "/status");

    return query
      .then(async (res) => {
        const text = await res.clone().text();

        if (text?.toLowerCase().includes("not found")) {
          return text;
        }

        return res.clone().json();
      });
  }

  /**
   * Query the `/tx/<tx-id>/<field>` endpoint to get the field of the
   * transaction with the provided `txId`.
   * @param address The transaction's ID.
   * @returns A `Response` object. You should call `.json()`, `.text()` or some
   * method to parse the response body based on the `field` you provided.
   */
  txField(
    txId: string,
    field:
      | "id"
      | "last_tx"
      | "owner"
      | "tags"
      | "target"
      | "quantity"
      | "data"
      | "data_root"
      | "data_size"
      | "reward"
      | "signature",
  ): Promise<Response> {
    if (typeof txId !== "string") {
      throw new GatewayTypeError(
        "Argument `txId: string` is required",
      );
    }

    if (typeof field !== "string") {
      throw new GatewayTypeError(
        "Argument `field: string` is required",
      );
    }

    return fetch(this.base_url + "/tx/" + txId + "/" + field);
  }

  /**
   * Query the `/tx/<tx-id>/status` endpoint to get the status of the
   * transaction having the provided `txId`.
   * @param address The transaction's ID.
   * @returns The transaction's status or `Not Found.` if the transaction cannot
   * be found in this gateway.
   */
  txStatus(txId: string): Promise<TransactionStatus | string> {
    if (typeof txId !== "string") {
      throw new GatewayTypeError(
        "Argument `txId: string` is required",
      );
    }

    const query = fetch(this.base_url + "/tx/" + txId + "/status");

    return query
      .then(async (res) => {
        const text = await res.clone().text();

        if (text?.toLowerCase().includes("not found")) {
          return text;
        }

        return res.clone().json();
      });
  }
}

import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";

export abstract class AbstractQueryBuilder<Variables> {
  protected abstract operation: string;

  protected server_url: string;
  protected operation_variables: Partial<Variables> = {};
  protected return_schema: string;

  constructor(options: QueryBuilderOptions) {
    this.server_url = options.server_url;
  }

  /**
   * Build this query.
   * @return The query as a string to send to the GraphQL server.
   */
  abstract build(): {
    operationName: string;
    query: string;
    variables: Partial<Variables>;
  };

  variables(variables: Variables) {
    this.operation_variables = {
      ...(this.operation_variables || {}),
      ...(variables || {}),
    };

    return this;
  }

  /**
   * Make a `fetch` request to the GraphQL server.
   * @param options `RequestInit` options and an optional `url` option. If no
   * `url` option is provided, then the `server_url` provided in the `options`
   * will be used. If no `server_url` is provided, then the default server URL
   * will be used.
   * @returns The response to the request.
   */
  post(
    options: RequestInit & { url?: string } = {},
  ): Promise<Response> {
    const query = this.build();

    if (!options.url) {
      options.url = this.server_url;
    }

    const req = fetch(options.url, {
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        "accept": "application/json, text/plain, */*",
      },
      ...(options || {}),
      body: JSON.stringify(query),
      method: "POST",
    });

    // @ts-ignore Add .graph
    return req
      .then(async (res) => {
        if (res.status >= 400) {
          throw new Error(await res.clone().text());
        }

        return res;
      });
  }

  /**
   * Set the value to return from the GraphQL query.
   * @param returnValue
   * @returns `this` instance for further method chaining.
   * ```
   */
  returnSchema(schema?: string) {
    this.return_schema = schema;
    return this;
  }

  /**
   * @returns The `query` field of the `POST` request body.
   */
  protected buildQuery() {
    const ret = this.operation.replace(
      /\{\{ return_schema \}\}/g,
      this.return_schema,
    );

    return ret;
  }

  protected isNullOrUndefined(value: unknown): boolean {
    if (value === undefined) {
      return true;
    }

    if (value === null) {
      return true;
    }

    return false;
  }

  protected isEmptyArray(value: unknown): boolean {
    if (this.isNullOrUndefined(value)) {
      return true;
    }

    if (!Array.isArray(value)) {
      return true;
    }

    if (value.length <= 0) {
      return true;
    }

    return false;
  }
}

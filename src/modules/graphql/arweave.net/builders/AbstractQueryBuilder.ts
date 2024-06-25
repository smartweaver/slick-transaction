import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";

export abstract class AbstractQueryBuilder<Variables> {
  protected abstract query: string;

  protected server_url: string;
  protected operation_variables: Partial<Variables> = {};
  protected return_schema: string;

  constructor(options: QueryBuilderOptions) {
    this.server_url = options?.server_url || "https://arweave.net/graphql";
  }

  variables(variables: Variables) {
    this.operation_variables = {
      ...(this.operation_variables || {}),
      ...(variables || {}),
    };

    return this;
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

  /**
   * Make a `fetch` request to the GraphQL server.
   * @param options `RequestInit` options and an optional `url` option. If no
   * `url` option is provided, then the `server_url` provided in the `options`
   * will be used. If no `server_url` is provided, then the default server URL
   * `https://arweave.net/graphql` will be used.
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
        "accpet": "application/json, text/plain, */*",
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
   * Set the value to return.
   * @param returnValue
   * @returns `this` instance for further method chaining.
   * @example
   * ```ts
   * import { query } from "@smartweaver/slick-transaction/modules/graphql/Client";
   *
   * const res = await query()
   *   .returnSchema({
   *     schema: `
   *       edges {
   *         node {
   *           id
   *           recipient
   *           block {
   *             height
   *             timestamp
   *           }
   *           tags {
   *             name
   *             value
   *           }
   *         }
   *         cursor
   *       }
   *     `,
   *     fields: {
   *       tags: (tags: ({ name, value }) => {
   *       },
   *       recipient: (value: string) => {
   *         if (value === "YrmlhY6i0uedj0gRgvLzuL-UgIQEUfEw6ojWLYtSkXs") {
   *           return "My Token Process"
   *         }
   *
   *         return value;
   *       }
   *     }
   *   })
   *   .post();
   * ```
   */
  returnSchema(schema?: string) {
    this.return_schema = schema;
    return this;
  }

  protected buildQuery() {
    return this.query.replace(
      /\{\{ return_schema \}\}/g,
      this.return_schema || "{}",
    );
  }
}

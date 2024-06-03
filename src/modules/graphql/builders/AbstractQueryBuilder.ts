import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";

export abstract class AbstractQueryBuilder {
  protected return_schema = "{}";
  protected server_url: string;
  protected variables: string;

  constructor(options: QueryBuilderOptions) {
    this.server_url = options?.server_url || "https://arweave.net/graphql";
    this.variables = options?.variables || "";
  }

  /**
   * Build this query.
   * @return The query as a string to send to the GraphQL server.
   */
  abstract build(): string;

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
  ): Promise<Response & { graph<T = any>(): Promise<T> }> {
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
      body: JSON.stringify({
        query,
        operationName: null,
        variables: {},
      }),
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
    this.return_schema = schema || "{}";
    return this;
  }

  protected _concat(values: string[]) {
    let ret = null;

    if (values && Array.isArray(values)) {
      const concatted = values
        .map((value) => {
          return `"${value}"`;
        })
        .join("\n,");

      ret = `[${concatted}]`;
    }

    return ret;
  }

  protected stringExists(str: unknown) {
    return str && (typeof str === "string") && str.trim() !== "";
  }
}

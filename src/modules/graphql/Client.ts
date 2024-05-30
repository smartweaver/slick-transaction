export const defaultProjection = `edges {
  node {
    id
    owner {
      address
    }
    block {
      height
      timestamp
    }
    tags {
      name
      value
    }
  }
  cursor
}`;

export class QueryBuilder {
  protected _first?: string;
  protected _ids?: string;
  protected _owners?: string;
  protected _recipients?: string;
  protected _tags: { name: string; values: string[] }[] = [];
  protected _sort = "sort: HEIGHT_DESC";
  protected _return_schema = defaultProjection;

  build() {
    const ret: string[] = [
      `{`,
      `  transactions(`,
      `    ${this._sort}`,
    ];

    if (this._getQueryVariables() !== "") {
      ret.push(`    ${this._getQueryVariables()}`);
    }

    if (this._getQueryTags() !== "") {
      ret.push(`    ${this._getQueryTags()}`);
    }

    ret.push(`) {`);
    ret.push(`${this._return_schema}`);
    ret.push(`  }`);
    ret.push(`}`);

    return ret.join("\n");
  }

  ids(ids: string[]) {
    const concatted = this._concat(ids);

    if (concatted) {
      this._ids = `ids: ${concatted}`;
    }

    return this;
  }

  owners(owners: string[]) {
    const concatted = this._concat(owners);

    if (concatted) {
      this._owners = `owners: ${concatted}`;
    }

    return this;
  }

  recipients(recipients: string[]) {
    const concatted = this._concat(recipients);

    if (concatted) {
      this._recipients = `recipients: ${concatted}`;
    }

    return this;
  }

  tags(tags: { name: string; values: string[] }[]) {
    this._tags = this._tags.concat(tags);
    return this;
  }

  /**
   * Set the value to return.
   * @param returnValue
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
    this._return_schema = schema || defaultProjection;
    return this;
  }

  /**
   * Make a `fetch` request to the GraphQL server.
   * @returns The response to the request.
   */
  post(
    options: RequestInit = {},
  ): Promise<Response & { graph<T = any>(): Promise<T> }> {
    const query = this.build();

    console.log(query);

    const req = fetch("https://arweave.net/graphql", {
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

  protected _getQueryTags() {
    const tags: string[] = [];

    if (this._tags.length > 0) {
      const concattedTags = this._tags.map((tag) => {
        const concattedValues = this._concat(tag.values);

        const ret: string[] = [
          `    {`,
          `        name: "${tag.name}"`,
          `        values: ${concattedValues}`,
          `      }`,
        ];

        return ret.join("\n");
      });

      tags.push(`tags: [`);
      tags.push(`  ${concattedTags}`);
      tags.push(`    ]`);
    }

    return tags.join("\n");
  }

  protected _getQueryVariables() {
    const vars = [
      this._ids,
      this._owners,
      this._recipients,
      this._first,
    ];

    const ret: string[] = [];

    for (const value of vars) {
      if (this._stringExists(value)) {
        ret.push(`    ${value}`);
      }
    }

    return ret.join("\n");
  }

  protected _stringExists(str: unknown) {
    return str && (typeof str === "string") && str.trim() !== "";
  }
}

export function query() {
  return new QueryBuilder();
}

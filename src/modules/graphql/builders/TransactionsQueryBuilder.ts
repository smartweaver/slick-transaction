import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

export const defaultTransactionsQueryProjection = `edges {
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

export class TransactionsQueryBuilder extends AbstractQueryBuilder {
  #after?: string;
  #first?: string;
  #ids?: string;
  #owners?: string;
  #recipients?: string;
  #sort = "sort: HEIGHT_DESC";
  #tags: { name: string; values: string[] }[] = [];

  constructor(options?: QueryBuilderOptions) {
    super(options);
    this.return_schema = defaultTransactionsQueryProjection;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  after(after: string) {
    if (typeof after === "string") {
      this.#after = `after: "${after}"`;
    }
    return this;
  }

  build() {
    const ret: string[] = [
      `{`,
      `  transactions(`,
      `    ${this.#sort}`,
    ];

    if (this.#getQueryVariables() !== "") {
      ret.push(`    ${this.#getQueryVariables()}`);
    }

    if (this.#getQueryTags() !== "") {
      ret.push(`    ${this.#getQueryTags()}`);
    }

    ret.push(`) {`);
    ret.push(`${this.return_schema}`);
    ret.push(`  }`);
    ret.push(`}`);

    return ret.join("\n");
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  ids(ids: string[]) {
    const concatted = this._concat(ids);

    if (concatted) {
      this.#ids = `ids: ${concatted}`;
    }

    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  owners(owners: string[]) {
    const concatted = this._concat(owners);

    if (concatted) {
      this.#owners = `owners: ${concatted}`;
    }

    return this;
  }

  /**
   * @returns `this` instance for further method chaining.
   */
  recipients(recipients: string[]) {
    const concatted = this._concat(recipients);

    if (concatted) {
      this.#recipients = `recipients: ${concatted}`;
    }

    return this;
  }

  /**
   * Set the tags to send with the query.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: { name: string; values: string[] }[]) {
    this.#tags = this.#tags.concat(tags);
    return this;
  }

  #getQueryTags() {
    const tags: string[] = [];

    const tagsToBuild = this.#tags;

    if (tagsToBuild && tagsToBuild.length > 0) {
      const concattedTags = tagsToBuild.map((tag) => {
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

  #getQueryVariables() {
    const vars = [
      this.#after,
      this.#ids,
      this.#owners,
      this.#recipients,
      this.#first,
    ];

    const ret: string[] = [];

    for (const value of vars) {
      if (this.stringExists(value)) {
        ret.push(`    ${value}`);
      }
    }

    if (this.stringExists(this.variables)) {
      ret.push(`    ${this.variables}`);
    }

    return ret.join("\n");
  }
}

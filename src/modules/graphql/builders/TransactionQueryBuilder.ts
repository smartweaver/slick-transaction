import { QueryBuilderOptions } from "../types/QueryBuilderOptions.ts";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.ts";

export const defaultTransactionQueryProjection = `
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
`;

export class TransactionQueryBuilder extends AbstractQueryBuilder {
  #id?: string;

  constructor(options?: QueryBuilderOptions) {
    super(options);
    this.return_schema = defaultTransactionQueryProjection
  }

  build() {
    if (!this.#id) {
      throw new Error(`Cannot create Transaction query without transaction ID`);
    }

    const ret: string[] = [
      `{`,
      `  transaction(`,
      `    id: "${this.#id}"`,
    ];

    ret.push(`) {`);
    ret.push(`${this.return_schema}`);
    ret.push(`  }`);
    ret.push(`}`);

    return ret.join("\n");
  }

  id(id: string) {
    this.#id = id;

    return this;
  }
}

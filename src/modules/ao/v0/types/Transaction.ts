import { Owner } from "./Owner.ts";
import { Tag } from "./Tag.ts";

export type Transaction = {
  id: string;

  /** The transaction owner (aka the entity that signed this transaction). */
  owner: Owner;

  data: string;
  tags: Tag[];
  signature: string;
  anchor: null | string;
  target: string;
};

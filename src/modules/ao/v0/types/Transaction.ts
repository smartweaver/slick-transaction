import { Owner } from "./Owner";
import { Tag } from "./Tag";

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

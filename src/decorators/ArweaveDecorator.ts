import { Arweave } from "../../deps.ts";

export class ArweaveDecorator {
  readonly arweave: Arweave;

  constructor(arweave: Arweave) {
    this.arweave = arweave;
  }
}

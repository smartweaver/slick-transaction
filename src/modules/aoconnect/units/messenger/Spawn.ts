import { TransactionBuilder } from "../../builders/TransactionBuilder.ts";
import { SDKTags } from "../../tags/SDKTags.ts";

export class Spawn extends TransactionBuilder {
  protected anchor_id?: string;
  protected module_id?: string;
  protected scheduler_id?: string;

  /**
   * Set the module ID this process should spawn with.
   *
   * @param moduleId The module ID in question.
   * @returns `this` instance for further method chaining.
   */
  module(moduleId: string) {
    this.module_id = moduleId;
    return this;
  }

  /**
   * Set the scheduler ID this process should spawn with.
   *
   * @param moduleId The scheduler ID in question.
   * @returns `this` instance for further method chaining.
   */
  scheduler(schedulerId: string) {
    this.scheduler_id = schedulerId;
    return this;
  }

  /**
   * Spawn a new process.
   *
   * @returns The ID of the newly spawned process.
   */
  post(): Promise<string> {
    if (!this.data_item_signer) {
      throw new Error("Cannot spawn process without DataItem signer");
    }

    const { data, tags } = this.tx_builder.build();

    const args: any = {
      module: this.module_id,
      scheduler: this.scheduler_id,
      tags: [
        ...(tags || []),
        ...SDKTags,
      ],
      signer: this.data_item_signer,
    };

    if (this.anchor_id) {
      args.anchor_id = this.anchor_id;
    }

    if (data) {
      args.data = data;
    }

    return this.aoconnect.spawn(args);
  }
}

import { TransactionBuilder } from "../../builders/TransactionBuilder.ts";
import { SDKTags } from "../../tags/SDKTags.ts";

export class Message extends TransactionBuilder {
  protected process_id?: string;
  protected anchor_id?: string;

  /**
   * Set the anchor to target.
   *
   * @param anchor The anchor ID in question.
   * @returns `this` instance for further method chaining.
   */
  anchor(anchor: string) {
    this.anchor_id = anchor;
    return this;
  }

  /**
   * Set the ID of the process message should be sent to.
   *
   * @param processId The process ID in question.
   * @returns `this` instance for further method chaining.
   */
  process(processId: string) {
    this.process_id = processId;
    return this;
  }

  /**
   * Send a message.
   *
   * @returns The ID of the message.
   */
  post(): Promise<string> {
    if (!this.process_id) {
      throw new Error("Cannot send DryRun without Process ID");
    }

    if (!this.data_item_signer) {
      throw new Error("Cannot send DryRun without DataItem signer");
    }

    const { data, tags } = this.tx_builder.build();

    const args: any = {
      tags: [
        ...(tags || []),
        ...SDKTags,
      ],
      signer: this.data_item_signer,
      process: this.process_id,
    };

    if (this.anchor_id) {
      args.anchor_id = this.anchor_id;
    }

    if (data) {
      args.data = data;
    }

    return this.aoconnect.message(args);
  }
}

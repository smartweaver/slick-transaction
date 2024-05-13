import {
  AbstractDryRun,
  PostResponse,
} from "../../../ao/v0/units/compute/AbstractDryRun.ts";
import { Compute } from "../../../ao/v0/units/Compute.ts";
import { AoConnect } from "../../interfaces/AoConnect.ts";
import { SDKTags } from "../../tags/SDKTags.ts";
import { Transaction } from "../../../../standard/transactions/format-2/Transaction.ts";

export class DryRun extends AbstractDryRun {
  protected _id?: string;
  protected _owner?: string;
  protected data_item_signer: any;
  protected anchor_id?: string;
  protected process_id?: string;
  protected aoconnect: AoConnect;

  protected tx_builder = Transaction.builder();

  constructor(computeUnit: Compute, aoconnect: AoConnect) {
    super(computeUnit);
    this.aoconnect = aoconnect;
  }

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
   * Set the data to send with this action.
   *
   * @param data The data in question.
   * @returns `this` instance for further method chaining.
   */
  data(data: any) {
    this.tx_builder.data(data);
    return this;
  }

  /**
   * Set the `DataItem` signer that aoconnect should use to sign this action.
   *
   * @param signer The signer in question.
   * @returns `this` instance for further method chaining.
   */
  dataItemSigner(signer: any): this {
    this.data_item_signer = signer;
    return this;
  }

  /**
   * Set the ID this DryRun message should use.
   *
   * @param id The ID in question.
   * @returns `this` instance for further method chaining.
   */
  id(id: string): this {
    this._id = id;
    return this;
  }

  /**
   * Set the owner ID this DryRun message should use.
   *
   * @param owner The owner ID in question.
   * @returns `this` instance for further method chaining.
   */
  owner(owner: string): this {
    this._owner = owner;
    return this;
  }

  /**
   * Add tags to the transaction.
   * @param tags The tags in question.
   * @returns `this` instance for further method chaining.
   */
  tags(tags: Record<string, string> = {}) {
    this.tx_builder.tags(tags);
    return this;
  }

  /**
   * Set the ID of the process this message should be sent to.
   *
   * @param processId The process ID in question.
   * @returns `this` instance for further method chaining.
   */
  process(processId: string) {
    this.process_id = processId;
    return this;
  }

  /**
   * Send a DryRun request.
   *
   * @returns The result of the request.
   */
  post(): Promise<PostResponse> {
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
      process: this.process_id,
      signer: this.data_item_signer,
    };

    if (this.anchor_id) {
      args.anchor_id = this.anchor_id;
    }

    if (data) {
      args.data = data;
    }

    if (this._id) {
      args.id = this._id;
    }

    if (this._owner) {
      args.owner = this._owner;
    }

    return this.aoconnect.dryrun(args);
  }
}

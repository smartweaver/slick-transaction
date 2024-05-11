import { DryRunResult } from "../types/DryRunResult.ts";

export class DryRunResultDecorator<T extends DryRunResult> {
  readonly result: T;

  constructor(result: T) {
    this.result = result;
  }

  /**
   * Get a decorated `Error` object.
   */
  get Error() {
    return {
      error: {
        /** Get the JSON representation of this error (assuming it is a JSON string). */
        json: () => this.toJsonObject(this.result.Error),
        /** Get the string representation of this error. */
        text: () => this.result.Error,
      },
    };
  }

  /**
   * * @todo (crookse) Implement.
   * Get a decorated `Messages` object.
   */
  get Messages() {
    return this.result.Messages;
  }

  /**
   * @todo (crookse) Implement.
   * Get a decorated `Spawns` object.
   */
  get Spawns() {
    return this.result.Spawns;
  }

  /**
   * Get a decorated `Output` object.
   */
  get Output() {
    return {
      data: {
        /** Get the JSON representation of this data (assuming it is a JSON string). */
        json: () =>
          this.toJsonObject(this.result.Output.data) as T["Output"]["data"],
        /** Get the string representation of this data. */
        text: () => this.result.Output.data,
      },
    };
  }

  /**
   * Convert the given value to a JSON object.
   * @param value The value in question.
   * @returns The value as a JSON object.
   */
  protected toJsonObject(value: unknown) {
    if (typeof value !== "string") {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (_e) {
      // Do nothing. Fall through to returning null.
    }

    return null;
  }
}

/**
 * Get a decorated `DryRunResult` object.
 * @param dryRunResult The `DryRunResult` object to decorate.
 * @returns A decorated `DryRunResult` object.
 */
export function dryRunResult<T extends DryRunResult>(dryRunResult: T) {
  return new DryRunResultDecorator<T>(dryRunResult);
}

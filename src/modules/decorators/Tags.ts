import { Transaction } from "../../core/interfaces/Transaction.ts";

export class Tags {
  #wrappee: Transaction["tags"];

  constructor(tags: Transaction["tags"]) {
    this.#wrappee = tags;
  }

  /**
   * Read the tags to completion and return them in key-value pairs.
   * @returns The tags in key-value pairs.
   * @example
   * ```ts
   * // If the tags are ...
   * //
   * //   [ { name: "Hello", value: "World" } ]
   * //
   * // ... then this method will return:
   *
   * {
   *   "Hello": "World"
   * }
   * ```
   */
  kvp() {
    const tags: Record<string, string> = {};

    this.#wrappee.forEach((tag) => {
      if ("get" in tag && typeof tag.get === "function") {
        const name = tag.get("name", { decode: true, string: true });
        const value = tag.get("value", { decode: true, string: true });
        tags[name] = value;
        return;
      }

      if (tag.name && tag.value) {
        tags[tag.name] = tag.value;
      }
    });

    return tags;
  }

  /**
   * Find a tag by the given `name` and return its value.
   * @param name The tag name in question.
   * @returns The value of the tag or `null` if the tag name is not found.
   */
  findByName(name: string): string | null {
    const kvp = this.kvp();

    for (const tagName in kvp) {
      if (tagName === name) {
        return kvp[name];
      }
    }

    return null;
  }
}

export function tags(tags: Transaction["tags"]) {
  return new Tags(tags || []);
}

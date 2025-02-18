import { Transaction } from "../../core/interfaces/Transaction.ts";

export class TagsDecorator {
  #wrappee: Transaction["tags"];

  constructor(tags?: Transaction["tags"]) {
    if (!Array.isArray(tags)) {
      tags = [];
    }

    this.#wrappee = tags;
  }

  /**
   * @deprecated on 2025-02-17. Use `toKvp()`.
   *
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
   * Read the tags to completion and return them in key-value pairs where the
   * key is the tag name and the value is an array of the tag's values.
   * @returns The tags in key-value pairs.
   * @example
   * ```ts
   * const rawTags = [
   *   { name: "Hello", value: "World" },
   *   { name: "Hello", value: "Test" },
   *   { name: "Ok", value: "Then" },
   * ]
   *
   * const kvp = tags(rawTags).toKvp()
   * // Outputs => {
   * //   "Hello": ["World", "Test"],
   * //   "Ok": ["Then"]
   * // }
   * ```
   */
  toKvp() {
    const tags: Record<string, string[]> = {};

    for (const tag of this.#wrappee) {
      // This will throw an error if the caller provides a function, but fails
      // to have the tags comply to these types
      if ("get" in tag && typeof tag.get === "function") {
        const name = tag.get("name", { decode: true, string: true });
        const value = tag.get("value", { decode: true, string: true });

        if (!(name in tags)) {
          tags[name] = [];
        }

        tags[name].push(value);

        continue;
      }

      if (typeof tag.name === "string" && typeof tag.value === "string") {
        if (!(tag.name in tags)) {
          tags[tag.name] = [];
        }

        tags[tag.name].push(tag.value);
      }
    }

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

/**
 * @deprecated on 2025-02-16. Use `TagsDecorator` class.
 */
export class Tags extends TagsDecorator {}

/**
 * @deprecated on 2025-02-17. Use `decorateTags()`
 */
export function tags(tags: Transaction["tags"]) {
  return new TagsDecorator(tags);
}

export function decorateTags(tags: Transaction["tags"]) {
  return new TagsDecorator(tags);
}

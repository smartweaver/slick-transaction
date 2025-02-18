import { describe, expect, test } from "vitest";
import { decorateTags } from "../../../../../src/modules/decorators/TagsDecorator.ts";

describe("TagsDecorator", () => {
  describe("toKvp()", () => {
    test("converts plain tags to key-value pairs", async () => {
      const actual = decorateTags([
        { name: "Hello", value: "World" },
        { name: "Hello", value: "Test" },
        { name: "Ok", value: "Then" },
      ]).toKvp();

      expect(actual).toStrictEqual({
        "Hello": ["World", "Test"],
        "Ok": ["Then"],
      });
    });

    test("converts tags with tag.get() function to key-value pairs", async () => {
      class Tag {
        protected name: string;
        protected value: any;

        constructor(name: string, value: any) {
          this.name = name;
          this.value = value;
        }

        get(
          field: keyof this,
          options: { decode?: boolean; string?: boolean },
        ) {
          // Don't really care about decode. Don't really care about this impl
          // being passed in at all, so just testing the surface.
          if (options?.string === true) {
            return `${this[field]}`;
          }

          return this[field];
        }
      }

      const actual = decorateTags([
        // @ts-ignore Testing Arweave JS lib `Tag` being passed in
        new Tag("Hello", "World"),
        // @ts-ignore Testing Arweave JS lib `Tag` being passed in
        new Tag("Hello", "Test"),
        // @ts-ignore Testing Arweave JS lib `Tag` being passed in
        new Tag("Ok", "Then"),
      ]).toKvp();

      expect(actual).toStrictEqual({
        "Hello": ["World", "Test"],
        "Ok": ["Then"],
      });
    });
  });
});

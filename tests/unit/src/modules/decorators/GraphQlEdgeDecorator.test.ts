import { describe, expect, test } from "vitest";
import { decorateGraphQlEdge } from "../../../../../src/modules/decorators/GraphQlEdgeDecorator.ts";

describe("GraphQlEdgeDecorator", () => {
  describe("hasBlockHeight()", () => {
    test("returns true if the edge has a block height", async () => {
      let actual;

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: 800,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(true);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {},
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: "not a number !!!!",
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: -1,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: Infinity,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: undefined,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: true,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(false);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: 1,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(true);

      actual = decorateGraphQlEdge({
        cursor: "some-cursor",
        node: {
          id: "some-id-600",
          anchor: "blah",
          owner: {
            address: "owner-address-600",
          },
          recipient: "recipient-address-600",
          block: {
            height: 0,
          },
          tags: [
            { name: "Ok", value: "Then" },
          ],
        },
      })
        .hasBlockHeight();

      expect(actual).toStrictEqual(true);
    });
  });
});

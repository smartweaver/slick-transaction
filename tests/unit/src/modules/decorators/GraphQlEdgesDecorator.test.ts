import { describe, expect, test } from "vitest";
import { decorateGraphQlEdges } from "../../../../../src/modules/decorators/GraphQlEdgesDecorator.ts";

const edges = [
  {
    cursor: "some-cursor",
    node: {
      id: "some-id-100",
      anchor: "blah",
      owner: {
        address: "owner-address-100",
      },
      recipient: "recipient-address-100",
      block: {
        height: 100,
      },
    },
  },
  {
    cursor: "some-cursor",
    node: {
      id: "some-id-200",
      anchor: "blah",
      owner: {
        address: "owner-address-200",
      },
      recipient: "recipient-address-200",
      block: {
        height: 101,
      },
    },
  },
  {
    cursor: "some-cursor",
    node: {
      id: "some-id-300",
      anchor: "blah",
      owner: {
        address: "owner-address-300",
      },
      recipient: "recipient-address-300",
      block: {
        height: 200,
      },
    },
  },
  {
    cursor: "some-cursor",
    node: {
      id: "some-id-400",
      anchor: "blah",
      owner: {
        address: "owner-address-400",
      },
      recipient: "recipient-address-400",
      block: {
        height: 99,
      },
      tags: [
        { name: "Hello", value: "World" },
        { name: "Hello", value: "Test" },
        { name: "Ok", value: "Then" },
      ],
    },
  },
  {
    cursor: "some-cursor",
    node: {
      id: "some-id-500",
      anchor: "blah",
      owner: {
        address: "owner-address-500",
      },
      recipient: "recipient-address-500",
      block: null,
      tags: [
        { name: "Hello", value: "World" },
        { name: "Hello", value: "Test" },
        { name: "Ok", value: "Then" },
      ],
    },
  },
  {
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
  },
];

describe("GraphQlEdgesDecorator", () => {
  describe("filterEdgesByConfirmations()", () => {
    test("returns edges having the min confirmations compared against the network height", async () => {
      let actual;

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByConfirmations(101, 2)
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-400",
            anchor: "blah",
            owner: {
              address: "owner-address-400",
            },
            recipient: "recipient-address-400",
            block: {
              height: 99,
            },
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
      ]);

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByConfirmations(102, 2)
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-100",
            anchor: "blah",
            owner: {
              address: "owner-address-100",
            },
            recipient: "recipient-address-100",
            block: {
              height: 100,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-400",
            anchor: "blah",
            owner: {
              address: "owner-address-400",
            },
            recipient: "recipient-address-400",
            block: {
              height: 99,
            },
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
      ]);
    });
  });

  describe("filterEdgesByBlockHeight()", () => {
    test("returns edges having the min and max block heights", async () => {
      let actual;

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByBlockHeight(100)
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-100",
            anchor: "blah",
            owner: {
              address: "owner-address-100",
            },
            recipient: "recipient-address-100",
            block: {
              height: 100,
            },
          },
        },
      ]);

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByBlockHeight(91, 201)
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-100",
            anchor: "blah",
            owner: {
              address: "owner-address-100",
            },
            recipient: "recipient-address-100",
            block: {
              height: 100,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-200",
            anchor: "blah",
            owner: {
              address: "owner-address-200",
            },
            recipient: "recipient-address-200",
            block: {
              height: 101,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-300",
            anchor: "blah",
            owner: {
              address: "owner-address-300",
            },
            recipient: "recipient-address-300",
            block: {
              height: 200,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-400",
            anchor: "blah",
            owner: {
              address: "owner-address-400",
            },
            recipient: "recipient-address-400",
            block: {
              height: 99,
            },
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
      ]);

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByBlockHeight(300)
        .toTransactionEdges();

      expect(actual).toStrictEqual([]);
    });
  });

  describe("filterEdgesWithBlockHeight()", () => {
    test("returns edges with a block height", async () => {
      let actual;

      actual = decorateGraphQlEdges(edges)
        .filterEdgesWithBlockHeight()
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-100",
            anchor: "blah",
            owner: {
              address: "owner-address-100",
            },
            recipient: "recipient-address-100",
            block: {
              height: 100,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-200",
            anchor: "blah",
            owner: {
              address: "owner-address-200",
            },
            recipient: "recipient-address-200",
            block: {
              height: 101,
            },
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-300",
            anchor: "blah",
            owner: {
              address: "owner-address-300",
            },
            recipient: "recipient-address-300",
            block: {
              height: 200,
            },
          },
        },

        {
          cursor: "some-cursor",
          node: {
            id: "some-id-400",
            anchor: "blah",
            owner: {
              address: "owner-address-400",
            },
            recipient: "recipient-address-400",
            block: {
              height: 99,
            },
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
        {
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
        },
      ]);
    });
  });

  describe("filterEdgesWithoutBlockHeight()", () => {
    test("returns edges without a block height", async () => {
      let actual;

      actual = decorateGraphQlEdges(edges)
        .filterEdgesWithoutBlockHeight()
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-500",
            anchor: "blah",
            owner: {
              address: "owner-address-500",
            },
            recipient: "recipient-address-500",
            block: null,
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
      ]);
    });
  });

  describe("filterEdgesByTag()", () => {
    test("returns edges with the matching tags", async () => {
      let actual;

      actual = decorateGraphQlEdges(edges)
        .filterEdgesByTag("Hello", "World")
        .toTransactionEdges();

      expect(actual).toStrictEqual([
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-400",
            anchor: "blah",
            owner: {
              address: "owner-address-400",
            },
            recipient: "recipient-address-400",
            block: {
              height: 99,
            },
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
        {
          cursor: "some-cursor",
          node: {
            id: "some-id-500",
            anchor: "blah",
            owner: {
              address: "owner-address-500",
            },
            recipient: "recipient-address-500",
            block: null,
            tags: [
              { name: "Hello", value: "World" },
              { name: "Hello", value: "Test" },
              { name: "Ok", value: "Then" },
            ],
          },
        },
      ]);
    });
  });
});

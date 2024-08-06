import { describe, expect, test } from "vitest";
import { query } from "../../../../src/modules/graphql/arweave.net/Query.ts";

describe("query()", () => {
  describe("tags()", () => {
    test("Pushed-For", async () => {
      const res = await query()
        .forTransactions()
        .tags([
          {
            name: "Pushed-For",
            values: ["bgdRvkb_eSrbd3PbrZZ0HhdLgcdu7TYHxIvgNU3E2Ec"],
          },
        ])
        .build();

      const expected = `query GetTransactions(
  $ids: [ID!]
  $owners: [String!]
  $recipients: [String!]
  $tags: [TagFilter!]
  $bundledIn: [ID!]
  $block: BlockFilter
  $first: Int = 10
  $after: String
  $sort: SortOrder = HEIGHT_DESC
) {
  transactions(
    ids: $ids
    owners: $owners
    recipients: $recipients
    tags: $tags
    bundledIn: $bundledIn
    block: $block
    first: $first
    after: $after
    sort: $sort
  ) {
    
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        owner {
          address
        }
        block {
          height
          timestamp
        }
        tags {
          name
          value
        }
      }
    }

  }
}`;

      expect(res.operationName).toStrictEqual(`GetTransactions`);
      expect(res.query).toStrictEqual(expected);
      expect(res.variables).toStrictEqual({
        tags: [
          {
            name: "Pushed-For",
            values: ["bgdRvkb_eSrbd3PbrZZ0HhdLgcdu7TYHxIvgNU3E2Ec"],
          },
        ],
      });
    });
  });
});

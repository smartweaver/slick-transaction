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
  $after: String
  $block: BlockFilter
  $bundledIn: [ID!]
  $first: Int = 10
  $ids: [ID!]
  $owners: [String!]
  $recipients: [String!]
  $sort: SortOrder = HEIGHT_DESC
  $tags: [TagFilter!]
) {
  transactions(
    after: $after
    block: $block
    bundledIn: $bundledIn
    first: $first
    ids: $ids
    owners: $owners
    recipients: $recipients
    sort: $sort
    tags: $tags
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
          recipient
          quantity {
            ar
            winston
          }
          block {
            timestamp
            height
          }
          ingested_at
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

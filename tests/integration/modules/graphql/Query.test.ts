import { describe, expect, test } from "vitest";
import { query } from "../../../../src/modules/graphql/Query.ts";

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

      const expected = `{
  transactions(
    sort: HEIGHT_DESC
    tags: [
      {
        name: \"Pushed-For\"
        values: [\"bgdRvkb_eSrbd3PbrZZ0HhdLgcdu7TYHxIvgNU3E2Ec\"]
      }
    ]
) {
edges {
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
  cursor
}
  }
}`;

      expect(res).toStrictEqual(expected);
    });
  });
});

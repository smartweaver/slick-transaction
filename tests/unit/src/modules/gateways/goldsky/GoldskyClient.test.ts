import { describe, expect, test } from "vitest";
import { GoldskyClient } from "../../../../../../src/modules/gateways/goldsky/GoldskyClient.ts";
import { GoldskyGateway } from "../../../../../../src/modules/gateways/goldsky/GoldskyGateway.ts";

describe("gateway()", () => {
  test("returns a gateway instance", async () => {
    const actual = new GoldskyClient().gateway();
    expect(actual).toBeInstanceOf(GoldskyGateway);
  });
});

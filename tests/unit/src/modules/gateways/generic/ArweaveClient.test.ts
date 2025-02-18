import { describe, expect, test } from "vitest";
import { ArweaveClient } from "../../../../../../src/modules/gateways/generic/ArweaveClient.ts";
import { ArweaveGateway } from "../../../../../../src/modules/gateways/generic/ArweaveGateway.ts";

describe("gateway()", () => {
  test("returns a gateway instance", async () => {
    const actual = new ArweaveClient().gateway();
    expect(actual).toBeInstanceOf(ArweaveGateway);
  });
});

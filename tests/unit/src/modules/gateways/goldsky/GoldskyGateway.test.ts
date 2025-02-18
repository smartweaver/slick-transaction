import { beforeEach, describe, expect, test, vi } from "vitest";
import { GoldskyGateway } from "../../../../../../src/modules/gateways/goldsky/GoldskyGateway.ts";
import { GoldskyGraphQlClient } from "../../../../../../src/modules/gateways/goldsky/GoldskyGraphQlClient.ts";

//
// NOTE
//
// SOME OF THESE TESTS DO NOT ASSERT THE RESPONSE FROM THE ACTUAL GATEWAY.
// INSTEAD OF CALLING THE GATEWAY, THE RESPONSES HAVE BEEN FAKED. THESE TESTS
// JUST ENSURE THEY CAN BE CALLED AND PARSE THE RESPONSES CORRECTLY.
//

vi.stubGlobal("fetch", (url: string) => {
  if (url === "https://arweave.net/wallet/1337/balance") {
    return Promise.resolve(new Response("0"));
  }

  if (url === "https://arweave.net/info") {
    return Promise.resolve(
      new Response(JSON.stringify({
        version: 1337,
      })),
    );
  }

  if (url === "https://arweave.net/tx/1337") {
    return Promise.resolve(
      new Response(JSON.stringify({
        id: 1337,
      })),
    );
  }

  if (url === "https://arweave.net/tx/1338") {
    return Promise.resolve(new Response("Not Found"));
  }

  if (url === "https://arweave.net/tx/1337/signature") {
    return Promise.resolve(new Response("some-signature"));
  }

  if (url === "https://arweave.net/tx/1337/status") {
    return Promise.resolve(
      new Response(JSON.stringify(
        {
          "block_height": 8675309,
          "block_indep_hash": "some-hash",
          "number_of_confirmations": 9000,
        },
      )),
    );
  }

  if (url === "https://arweave.net/tx/1338/status") {
    return Promise.resolve(new Response("Not Found"));
  }
});

const gateway = new GoldskyGateway("https://arweave.net");

describe("configs", () => {
  test("returns the gateway's configs", async () => {
    let actual;

    const goldsky = new GoldskyGateway("https://arweave.net");

    actual = goldsky.configs;

    expect(actual).toStrictEqual({
      base_url: "https://arweave.net",
    });

    const permagate = new GoldskyGateway("https://permagate.io");

    actual = permagate.configs;

    expect(actual).toStrictEqual({
      base_url: "https://permagate.io",
    });
  });
});

describe("graphql()", () => {
  test("it returns a GraphQL client instance", async () => {
    const actual = gateway.graphql();
    expect(actual).toBeInstanceOf(GoldskyGraphQlClient);
  });
});

import { beforeEach, describe, expect, test, vi } from "vitest";
import { ArweaveGateway } from "../../../../../../src/modules/gateways/generic/ArweaveGateway.ts";
import { ArweaveGraphQlClient } from "../../../../../../src/modules/gateways/generic/ArweaveGraphQlClient.ts";

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

const gateway = new ArweaveGateway("https://arweave.net");

describe("configs", () => {
  test("returns the gateway's configs", async () => {
    let actual;

    const arweaveDotNet = new ArweaveGateway("https://arweave.net");

    actual = arweaveDotNet.configs;

    expect(actual).toStrictEqual({
      base_url: "https://arweave.net",
    });

    const permagate = new ArweaveGateway("https://permagate.io");

    actual = permagate.configs;

    expect(actual).toStrictEqual({
      base_url: "https://permagate.io",
    });
  });
});

describe("balance()", () => {
  test("it returns the balance of the provided address", async () => {
    const actual = await gateway.balance("1337");
    expect(actual).toStrictEqual("0");
  });
});

describe("graphql()", () => {
  test("it returns a GraphQL client instance", async () => {
    const actual = gateway.graphql();
    expect(actual).toBeInstanceOf(ArweaveGraphQlClient);
  });
});

describe("info()", () => {
  test("it returns the gateway's network info", async () => {
    const actual = await gateway.info();
    expect(actual).toStrictEqual({ version: 1337 });
  });
});

describe("tx()", () => {
  test("it returns the transaction's data", async () => {
    const actual = await gateway.tx("1337");
    expect(actual).toStrictEqual({ id: 1337 });
  });

  test("handles Not Found responses", async () => {
    const actual = await gateway.tx("1338");
    expect(actual).toStrictEqual("Not Found");
  });
});

describe("txField()", () => {
  test("it returns the transaction's field", async () => {
    const res = await gateway.txField("1337", "signature");
    const actual = await res.text();
    expect(actual).toStrictEqual("some-signature");
  });

  // TODO(crookse) Handle empty field or whatever "empty" is defined as
});

describe("txStatus()", () => {
  test("it returns the transaction's status", async () => {
    const actual = await gateway.txStatus("1337");
    expect(actual).toStrictEqual({
      "block_height": 8675309,
      "block_indep_hash": "some-hash",
      "number_of_confirmations": 9000,
    });
  });

  test("handles Not Found responses", async () => {
    const actual = await gateway.txStatus("1338");
    expect(actual).toStrictEqual("Not Found");
  });
});

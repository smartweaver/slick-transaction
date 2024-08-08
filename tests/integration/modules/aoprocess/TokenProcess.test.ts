import { describe, expect, test, vi } from "vitest";
import aoconnect from "@permaweb/aoconnect";
import { TokenProcess } from "../../../../src/modules/aoprocess/TokenProcess.ts";
import packageJson from "../../../../package.json";

const expectedSdkName = "@smartweaver/slick-transaction";
const expectedSdkVersion = packageJson.version + "-" +
  packageJson.versionBuildDate;

// We do not want to send an actual request through aoconnect, so we return the
// args that would be sent to aoconnect's APIs and verify those
vi.mock("@permaweb/aoconnect", () => {
  return {
    default: {
      dryrun: (...args: any[]) => {
        return args;
      },

      message: (...args: any[]) => {
        return args;
      },

      result: (...args: any[]) => {
        return args;
      },

      results: (...args: any[]) => {
        return args;
      },

      spawn: (...args: any[]) => {
        return args;
      },
    },
  };
});

const dSigner = () => {
  return "some-data-item-signer";
};

const token = new TokenProcess(aoconnect, "MyProcessId1337");

describe("TokenProcess", () => {
  test("balance()", async () => {
    const result = await token
      .balance("some-target-address")
      .post();

    expect(result).toStrictEqual([
      {
        process: "MyProcessId1337",
        tags: [
          { name: "Action", value: "Balance" },
          { name: "Target", value: "some-target-address" },
          { name: "SDK-Name", value: expectedSdkName },
          { name: "SDK-Version", value: expectedSdkVersion },
        ],
      },
    ]);
  });

  test("balances()", async () => {
    const result = await token
      .balances()
      .post();

    expect(result).toStrictEqual([
      {
        process: "MyProcessId1337",
        tags: [
          { name: "Action", value: "Balances" },
          { name: "SDK-Name", value: expectedSdkName },
          { name: "SDK-Version", value: expectedSdkVersion },
        ],
      },
    ]);
  });

  test("burn()", async () => {
    const result = await token
      .burn(
        "some-target",
        "670000000000000",
      )
      .tags({
        "X-Some-Tag": "some-tag-value",
      })
      .dataItemSigner(dSigner)
      .post();

    expect(result).toStrictEqual([
      {
        process: "MyProcessId1337",
        signer: dSigner,
        tags: [
          { name: "Action", value: "Burn" },
          { name: "Target", value: "some-target" },
          { name: "Quantity", value: "670000000000000" },
          { name: "X-Some-Tag", value: "some-tag-value" },
          { name: "SDK-Name", value: expectedSdkName },
          { name: "SDK-Version", value: expectedSdkVersion },
        ],
      },
    ]);
  });

  test("mint()", async () => {
    const result = await token
      .mint(
        "some-target",
        "670000000000000",
      )
      .tags({
        "X-Some-Tag": "some-tag-value",
      })
      .dataItemSigner(dSigner)
      .post();

    expect(result).toStrictEqual([
      {
        process: "MyProcessId1337",
        signer: dSigner,
        tags: [
          { name: "Action", value: "Mint" },
          { name: "Target", value: "some-target" },
          { name: "Quantity", value: "670000000000000" },
          { name: "X-Some-Tag", value: "some-tag-value" },
          { name: "SDK-Name", value: expectedSdkName },
          { name: "SDK-Version", value: expectedSdkVersion },
        ],
      },
    ]);
  });

  test("transfer()", async () => {
    const result = await token
      .transfer(
        "some-target",
        "670000000000000",
      )
      .tags({
        "X-Some-Tag": "some-tag-value",
      })
      .dataItemSigner(dSigner)
      .post();

    expect(result).toStrictEqual([
      {
        process: "MyProcessId1337",
        signer: dSigner,
        tags: [
          { name: "Action", value: "Transfer" },
          { name: "Recipient", value: "some-target" },
          { name: "Quantity", value: "670000000000000" },
          { name: "X-Some-Tag", value: "some-tag-value" },
          { name: "SDK-Name", value: expectedSdkName },
          { name: "SDK-Version", value: expectedSdkVersion },
        ],
      },
    ]);
  });
});

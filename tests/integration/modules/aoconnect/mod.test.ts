import { describe, expect, test, vi } from "vitest";
import aoconnect from "@permaweb/aoconnect";
import { Client } from "../../../../src/modules/aoconnect/Client.ts";
import packageJson from "../../../../package.json";

const expectedSdkName = "@smartweaver/slick-transaction";
const expectedSdkVersion = packageJson.version + "-" +
  packageJson.versionBuildDate;

vi.mock("@permaweb/aoconnect", async () => {
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

const client = new Client(aoconnect);

const dSigner = () => {
  return "some-data-item-signer";
};

describe("Client", () => {
  //
  // Messenger Unit tests
  //

  describe("mu()", () => {
    test("message().post()", async () => {
      const result = await client
        .mu()
        .message()
        .process("1557")
        .tags({
          Action: "Some-Action",
          "Thank-U": "Next",
        })
        .dataItemSigner(dSigner)
        .post();

      expect(result).toStrictEqual([
        {
          process: "1557",
          signer: dSigner,
          tags: [
            { name: "Action", value: "Some-Action" },
            { name: "Thank-U", value: "Next" },
            { name: "SDK-Name", value: expectedSdkName },
            { name: "SDK-Version", value: expectedSdkVersion },
          ],
        },
      ]);
    });

    test("spawn().post()", async () => {
      const result = await client
        .mu()
        .spawn()
        .dataItemSigner(dSigner)
        .module("1887")
        .scheduler("1997")
        .post();

      expect(result).toStrictEqual([
        {
          signer: dSigner,
          module: "1887",
          scheduler: "1997",
          tags: [
            { name: "SDK-Name", value: expectedSdkName },
            { name: "SDK-Version", value: expectedSdkVersion },
          ],
        },
      ]);
    });
  });

  //
  // Compute Unit tests
  //
  describe("cu()", async () => {
    test("dryRun().post()", async () => {
      const result = await client
        .cu()
        .dryRun()
        .process("1557")
        .tags({
          Action: "Some-Action",
        })
        .dataItemSigner(dSigner)
        .post();

      expect(result).toStrictEqual([
        {
          process: "1557",
          signer: dSigner,
          tags: [
            { name: "Action", value: "Some-Action" },
            { name: "SDK-Name", value: expectedSdkName },
            { name: "SDK-Version", value: expectedSdkVersion },
          ],
        },
      ]);
    });

    test("result().message().process().get()", async () => {
      const result = await client
        .cu()
        .result()
        .message("1447")
        .process("1557")
        .get();

      expect(result).toStrictEqual([
        {
          message: "1447",
          process: "1557",
        },
      ]);
    });

    test("results().process().get()", async () => {
      const result = await client
        .cu()
        .results()
        .process("1557")
        .get();

      expect(result).toStrictEqual([
        {
          process: "1557",
        },
      ]);
    });

    test("results().process().{limit|from|to|sort}().get()", async () => {
      const result = await client
        .cu()
        .results()
        .process("1557")
        .limit(25)
        .from("from-cursor")
        .to("to-cursor")
        .sort("DESC")
        .get();

      expect(result).toStrictEqual([
        {
          process: "1557",
          from: "from-cursor",
          limit: "25", // This should be a string even though the builder expects a number
          sort: "DESC",
          to: "to-cursor",
        },
      ]);
    });
  });
});

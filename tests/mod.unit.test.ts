import { describe, expect, test } from "vitest";
import { Transaction } from "../src/mod.ts";
import { Arweave, ArweaveApiConfig, Bundler } from "../deps.ts";
import Api from "arweave/node/lib/api";
import Transactions from "arweave/node/transactions";
import { testSigningKey } from "./data/jwk.ts";
import { Tag } from "arweave/node/lib/transaction";

const txId = "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54";

class FakeApi extends Api {
  get(endpoint: string): Promise<any> {
    const res: any = {
      ok: true,
      data: null,
    };

    if (endpoint === "tx_anchor") {
      res.data = txId;
    }

    if (endpoint.includes("price/")) {
      res.data = "65596";
    }

    return Promise.resolve(res);
  }

  post(endpoint: string): Promise<any> {
    let data = endpoint;

    return Promise.resolve({
      data,
    });
  }
}

class FakeTransactions extends Transactions {
  getTransactionAnchor(): Promise<string> {
    return Promise.resolve(txId)
  }

  sign(...args: any[]): Promise<any> {
    return Promise.resolve(args);
  }
}

class FakeArweave extends Arweave {
  static init(apiConfig: ArweaveApiConfig) {
    return new FakeArweave(apiConfig);
  }

  constructor(apiConfig: ArweaveApiConfig) {
    super(apiConfig);
    this.api = new FakeApi(apiConfig);
    this.transactions = new FakeTransactions(
      this.api,
      FakeArweave.crypto,
      this.chunks,
    );
  }
}


const fakeArweave = FakeArweave.init({});

describe("methods", () => {
  describe("builder()", () => {
    test("can build a transfer transaction", async () => {
      const transaction = await Transaction
        .builder()
        .arweaveInstance(fakeArweave)
        .transfer()
        .target("wallet-address")
        .quantity("1")
        .signingKey(testSigningKey)
        .sign();

      if (!transaction.id) {
        transaction.id = "-";
      }

      const json = transaction.toJSON();

      expect(json).toStrictEqual({
        format: 2,
        id: transaction.id,
        last_tx: transaction.last_tx,
        owner: transaction.owner,
        tags: [],
        target: "wallet-address",
        quantity: "1",
        data: "",
        data_size: "0",
        data_root: "",
        data_tree: undefined,
        reward: transaction.reward,
        signature: transaction.signature,
      });
    });

    test("can build a bundled transaction", async () => {
      const transaction = await Transaction
        .builder()
        .arweaveInstance(fakeArweave)
        .bundle()
        .bundler(Bundler)
        .items([
          "item-1",
          "item-2",
        ])
        .signingKey(testSigningKey)
        .sign();


      if (!transaction.id) {
        transaction.id = "-";
      }

      const json = transaction.toJSON();
      json.data = "-";

      expect(json).toStrictEqual({
        format: 2,
        id: transaction.id,
        last_tx: transaction.last_tx,
        owner: transaction.owner,
        tags: [
          new Tag("QnVuZGxlLUZvcm1hdA", "YmluYXJ5"),
          new Tag("QnVuZGxlLVZlcnNpb24", "Mi4wLjA"),
        ],
        target: "",
        quantity: "0",
        data: "-",
        data_size: "2260",
        data_root: transaction.data_root,
        data_tree: undefined,
        reward: "65596",
        signature: transaction.signature,
      });
    });

    test("can build a transaction", async () => {
      const transaction = await Transaction
        .builder()
        .arweaveInstance(fakeArweave)
        .transaction()
        .attributes({
          data: "test",
          target: "0x1337"
        })
        .tags({
          Hello: "World",
        })
        .signingKey(testSigningKey)
        .sign();


      if (!transaction.id) {
        transaction.id = "-";
      }

      const json = transaction.toJSON();
      json.data = "-";

      expect(json).toStrictEqual({
        format: 2,
        id: transaction.id,
        last_tx: transaction.last_tx,
        owner: transaction.owner,
        tags: [
          new Tag("SGVsbG8", "V29ybGQ"),
        ],
        target: "0x1337",
        quantity: "0",
        data: "-",
        data_size: "4",
        data_root: transaction.data_root,
        data_tree: undefined,
        reward: "65596",
        signature: transaction.signature,
      });
    });
  });

  describe("parser()", () => {
    test("can parse tags", async () => {
      const tx = await Transaction
        .builder()
        .arweaveInstance(fakeArweave)
        .transaction()
        .attributes({
          data: "test",
          format: 2,
        })
        .tags({
          Hello: "World",
        })
        .signingKey(testSigningKey)
        .sign();

      const tags = Transaction
        .parser()
        .tags()
        .toKeyValuePairs(tx.tags);

      expect(tags).toStrictEqual({ Hello: "World" });
    });
  });
});

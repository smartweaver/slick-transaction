import { describe, expect, test } from "vitest";
import Arweave from "arweave";
import {
  ApiConfig as ArweaveApiConfig,
  default as Api,
} from "arweave/node/lib/api";
import Transactions from "arweave/node/transactions";
import { testSigningKey } from "../../../../test-data/jwk.ts";
import { Transaction as TransactionFormat2 } from "../../../../../src/standard/transactions/format-2/Transaction.ts";
import { ArweaveJSSigner } from "../../../../../src/standard/transactions/format-2/signers/ArweaveJSSigner.ts";
import { Tag } from "arweave/node/lib/transaction";

const txAnchor =
  "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54";

class FakeApi extends Api {
  get(endpoint: string): Promise<any> {
    const res: any = {
      ok: true,
      data: null,
    };

    if (endpoint === "tx_anchor") {
      res.data = txAnchor;
    }

    if (endpoint.includes("price/")) {
      res.data = "65596";
    }

    return Promise.resolve(res);
  }

  post(endpoint: string): Promise<any> {
    const data = endpoint;

    return Promise.resolve({
      data,
    });
  }
}

class FakeTransactions extends Transactions {
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

describe("methods", () => {
  describe("builder()", () => {
    test("can build a quantity transaction", async () => {
      const arweave = FakeArweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
      });

      const txFormat2Builder = TransactionFormat2
        .builder()
        .target("paxvhrSttpNtfCggtmOlmEOeECJDfJCSZVRHWLoYwCs")
        .quantity("1")
        .tags({
          "test": "hello",
          "test-2": "hello-2",
        });

      // Create the signer for signing format 2 transactions
      const txSigner = new ArweaveJSSigner({ arweave });

      // Build a format 2 transaction
      const txFormat2 = txFormat2Builder.build();

      // Sign the format 2 transaction
      const txFormat2Signed = await txSigner.sign(txFormat2, {
        key: testSigningKey,
      });

      // As a sanity check, verify the transaction's signature data is correct
      const verified = await txSigner.verify(txFormat2Signed);

      expect(verified).toBe(true);

      expect(verified).toBe(true);

      const expected = {
        format: 2,
        id: txFormat2Signed.id,
        last_tx:
          "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
        owner:
          "mEA1Y0bBD5XhGwOEpAl5clgR5HaFzhR5-jvhNce-xLb7NhGFYEqwklqm4ZKmVqcjm-5sI2juGrrefTSBrr4t43a15x3BGcPwxC0fm0rVClw5twrpXNzlWNCuXXUZfggjcC4vI_8crSUvy9rq_xQoKp4vEl-DpiTGHnJv_mX9__E_Y26l9I8zjFEjmg3L9tURYarj9Jkxuf3kP9KJPMFk_i4LCvmQYyRAXyRfnY6DXG3XnPcyIiy9Lew9A1p5myIkXyGCpHrBcbNFp9UVWiTs57pWrTzl4UO1vPT8qxlaMpXTzBU2xB2w3N4duTlRVCH_qHmj4GY1uZAZdLg30k6RMrqP4Hrv_q1zfnv0a2jZyIxBf4cEETFi4F9IS-UB5KR9GMgwgGkYv7nK3-biXW8z3pAXUriLPwVlmuTkWkgvNMavP1tYxudS6uQ1k-CwJliZYAj-HkLXPXZqZIr6WwNVltICKTvMmQpH37JFvWzE7kBXTS-FFqA-Gtbxv8BpEbPXC6tgA96jUxDV7wcnTNbuZJzP1ukpZYhXl--0XS6z7f89IVD0xwabySoNgnQxbLKnjXmJxzPevBE3WWQU_wFhSaOIpHvfL0IAxQw50lIQwWOrpQj6VacLnaXOAS0BaQyta-0N0sGcVQv14cuAfpEF_Qy-lJNpwkfspLCjZFRiRN8",
        tags: [
          new Tag("dGVzdA", "aGVsbG8"),
          new Tag("dGVzdC0y", "aGVsbG8tMg"),
        ],
        target: "paxvhrSttpNtfCggtmOlmEOeECJDfJCSZVRHWLoYwCs",
        quantity: "1",
        data: "",
        data_size: "0",
        data_root: "",
        reward: "65596",
        data_tree: undefined,
        signature: txFormat2Signed.signature,
      };

      expect(txFormat2Signed).toStrictEqual(expected);
    });

    test("can build a data transaction", async () => {
      const arweave = FakeArweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
      });

      const data = "hut-hut";

      // Create the builder for building format 2 transactions
      const txFormat2Builder = TransactionFormat2
        .builder()
        .data(data)
        .quantity("1");

      // Create the signer for signing format 2 transactions
      const txSigner = new ArweaveJSSigner({ arweave });

      // Build a format 2 transaction
      const txFormat2 = txFormat2Builder.build();

      // Sign the format 2 transaction
      const txFormat2Signed = await txSigner.sign(txFormat2, {
        key: testSigningKey,
      });

      // As a sanity check, verify the transaction's signature data is correct
      const verified = await txSigner.verify(txFormat2Signed);

      expect(verified).toBe(true);

      const expected = {
        format: 2,
        id: txFormat2Signed.id,
        last_tx:
          "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
        owner:
          "mEA1Y0bBD5XhGwOEpAl5clgR5HaFzhR5-jvhNce-xLb7NhGFYEqwklqm4ZKmVqcjm-5sI2juGrrefTSBrr4t43a15x3BGcPwxC0fm0rVClw5twrpXNzlWNCuXXUZfggjcC4vI_8crSUvy9rq_xQoKp4vEl-DpiTGHnJv_mX9__E_Y26l9I8zjFEjmg3L9tURYarj9Jkxuf3kP9KJPMFk_i4LCvmQYyRAXyRfnY6DXG3XnPcyIiy9Lew9A1p5myIkXyGCpHrBcbNFp9UVWiTs57pWrTzl4UO1vPT8qxlaMpXTzBU2xB2w3N4duTlRVCH_qHmj4GY1uZAZdLg30k6RMrqP4Hrv_q1zfnv0a2jZyIxBf4cEETFi4F9IS-UB5KR9GMgwgGkYv7nK3-biXW8z3pAXUriLPwVlmuTkWkgvNMavP1tYxudS6uQ1k-CwJliZYAj-HkLXPXZqZIr6WwNVltICKTvMmQpH37JFvWzE7kBXTS-FFqA-Gtbxv8BpEbPXC6tgA96jUxDV7wcnTNbuZJzP1ukpZYhXl--0XS6z7f89IVD0xwabySoNgnQxbLKnjXmJxzPevBE3WWQU_wFhSaOIpHvfL0IAxQw50lIQwWOrpQj6VacLnaXOAS0BaQyta-0N0sGcVQv14cuAfpEF_Qy-lJNpwkfspLCjZFRiRN8",
        tags: [],
        target: "",
        quantity: "1",
        data: btoa(data).replace(/==/, ""),
        data_size: "7",
        data_root: "j4nkNxuXeuosaVnAx9TFvXe2lqtaQ7HHaXOEGnWqCSo",
        data_tree: undefined,
        reward: "65596",
        signature: txFormat2Signed.signature,
      };

      expect(txFormat2Signed).toStrictEqual(expected);
    });
  });

  describe("from()", () => {
    test("can build a quantity transaction", async () => {
      const arweave = FakeArweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
      });

      const txFormat2Builder = TransactionFormat2.from({
        target: "paxvhrSttpNtfCggtmOlmEOeECJDfJCSZVRHWLoYwCs",
        quantity: "1",
        tags: {
          "test": "hello",
          "test-2": "hello-2",
        },
      });

      // Create the signer for signing format 2 transactions
      const txSigner = new ArweaveJSSigner({ arweave });

      // Build a format 2 transaction
      const txFormat2 = txFormat2Builder.build();

      // Sign the format 2 transaction
      const txFormat2Signed = await txSigner.sign(txFormat2, {
        key: testSigningKey,
      });

      // As a sanity check, verify the transaction's signature data is correct
      const verified = await txSigner.verify(txFormat2Signed);

      expect(verified).toBe(true);

      const expected = {
        format: 2,
        id: txFormat2Signed.id,
        last_tx:
          "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
        owner:
          "mEA1Y0bBD5XhGwOEpAl5clgR5HaFzhR5-jvhNce-xLb7NhGFYEqwklqm4ZKmVqcjm-5sI2juGrrefTSBrr4t43a15x3BGcPwxC0fm0rVClw5twrpXNzlWNCuXXUZfggjcC4vI_8crSUvy9rq_xQoKp4vEl-DpiTGHnJv_mX9__E_Y26l9I8zjFEjmg3L9tURYarj9Jkxuf3kP9KJPMFk_i4LCvmQYyRAXyRfnY6DXG3XnPcyIiy9Lew9A1p5myIkXyGCpHrBcbNFp9UVWiTs57pWrTzl4UO1vPT8qxlaMpXTzBU2xB2w3N4duTlRVCH_qHmj4GY1uZAZdLg30k6RMrqP4Hrv_q1zfnv0a2jZyIxBf4cEETFi4F9IS-UB5KR9GMgwgGkYv7nK3-biXW8z3pAXUriLPwVlmuTkWkgvNMavP1tYxudS6uQ1k-CwJliZYAj-HkLXPXZqZIr6WwNVltICKTvMmQpH37JFvWzE7kBXTS-FFqA-Gtbxv8BpEbPXC6tgA96jUxDV7wcnTNbuZJzP1ukpZYhXl--0XS6z7f89IVD0xwabySoNgnQxbLKnjXmJxzPevBE3WWQU_wFhSaOIpHvfL0IAxQw50lIQwWOrpQj6VacLnaXOAS0BaQyta-0N0sGcVQv14cuAfpEF_Qy-lJNpwkfspLCjZFRiRN8",
        tags: [
          new Tag("dGVzdA", "aGVsbG8"),
          new Tag("dGVzdC0y", "aGVsbG8tMg"),
        ],
        target: "paxvhrSttpNtfCggtmOlmEOeECJDfJCSZVRHWLoYwCs",
        quantity: "1",
        data: "",
        data_size: "0",
        data_root: "",
        reward: "65596",
        data_tree: undefined,
        signature: txFormat2Signed.signature,
      };

      expect(txFormat2Signed).toStrictEqual(expected);
    });

    test("can build a data transaction", async () => {
      const arweave = FakeArweave.init({
        host: "localhost",
        port: 1984,
        protocol: "http",
      });

      const transactionSigner = new ArweaveJSSigner({
        arweave,
      });

      const data = "hut-hut";

      const tx = TransactionFormat2.from({
        data,
        quantity: "1",
      })
        .build();

      const signed = await transactionSigner.sign(tx, { key: testSigningKey });

      // As a sanity check, verify the transaction's signature data is correct
      const verified = await transactionSigner.verify(signed);

      expect(verified).toBe(true);

      const expected = {
        format: 2,
        id: signed.id,
        last_tx:
          "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
        owner:
          "mEA1Y0bBD5XhGwOEpAl5clgR5HaFzhR5-jvhNce-xLb7NhGFYEqwklqm4ZKmVqcjm-5sI2juGrrefTSBrr4t43a15x3BGcPwxC0fm0rVClw5twrpXNzlWNCuXXUZfggjcC4vI_8crSUvy9rq_xQoKp4vEl-DpiTGHnJv_mX9__E_Y26l9I8zjFEjmg3L9tURYarj9Jkxuf3kP9KJPMFk_i4LCvmQYyRAXyRfnY6DXG3XnPcyIiy9Lew9A1p5myIkXyGCpHrBcbNFp9UVWiTs57pWrTzl4UO1vPT8qxlaMpXTzBU2xB2w3N4duTlRVCH_qHmj4GY1uZAZdLg30k6RMrqP4Hrv_q1zfnv0a2jZyIxBf4cEETFi4F9IS-UB5KR9GMgwgGkYv7nK3-biXW8z3pAXUriLPwVlmuTkWkgvNMavP1tYxudS6uQ1k-CwJliZYAj-HkLXPXZqZIr6WwNVltICKTvMmQpH37JFvWzE7kBXTS-FFqA-Gtbxv8BpEbPXC6tgA96jUxDV7wcnTNbuZJzP1ukpZYhXl--0XS6z7f89IVD0xwabySoNgnQxbLKnjXmJxzPevBE3WWQU_wFhSaOIpHvfL0IAxQw50lIQwWOrpQj6VacLnaXOAS0BaQyta-0N0sGcVQv14cuAfpEF_Qy-lJNpwkfspLCjZFRiRN8",
        tags: [],
        target: "",
        quantity: "1",
        data: btoa(data).replace(/==/, ""),
        data_size: "7",
        data_root: "j4nkNxuXeuosaVnAx9TFvXe2lqtaQ7HHaXOEGnWqCSo",
        data_tree: undefined,
        reward: "65596",
        signature: signed.signature,
      };

      expect(signed).toStrictEqual(expected);
    });
  });
});

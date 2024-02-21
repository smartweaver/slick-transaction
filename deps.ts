import Arweave from "arweave";
import { Tag as ArweaveTag } from "arweave/node/lib/transaction";
import { CreateTransactionInterface as ArweaveTransactionAttributes } from "arweave/node/common";
import { ApiConfig as ArweaveApiConfig } from "arweave/node/lib/api";
import { ArweaveSigner, bundleAndSignData, createData, DataItem, JWKInterface } from "arbundles";

/**
 * Bundler implementation
 */
const Bundler = {
  bundleAndSignData: (items: (Uint8Array | string)[], jwk: JWKInterface) => {
    const bundleSigner = new ArweaveSigner(jwk);

    const dataItems: DataItem[] = [];

    for (const item of items) {
      const dataItem = createData(item, bundleSigner);
      dataItems.push(dataItem);
    }

    return bundleAndSignData(dataItems, bundleSigner);
  },
}

export {
  Arweave,
  ArweaveApiConfig,
  ArweaveTransactionAttributes,
  ArweaveTag,
  Bundler,
};

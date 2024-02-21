import { JWK } from "./JWK";

export interface Bundler<T> {
  bundleAndSignData(items: (Uint8Array | string)[], jwk: JWK): Promise<T>;
}

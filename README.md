# Slick Transaction

Slick builder APIs for Arweave transaction creation

## Installation

```text
npm install @smartweaver/slick-transaction
```

## Usage

### Create a Transaction

```ts
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

const json = transaction.toJSON();

console.log(json);
// Example Output:
//
//   {
//     format: 2,
//     id: "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54,
//     last_tx: "102liodpz8315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l10px99do,
//     owner: <omitted for brevity>,
//     tags: [
//       new Tag("SGVsbG8", "V29ybGQ"),
//     ],
//     target: "0x1337",
//     quantity: "0",
//     data: "dGVzdA",
//     data_size: "4",
//     data_root: <omitted for brevity>,
//     data_tree: undefined,
//     reward: "65596",
//     signature: <omitted for brevity>,
//   }
```

### Create a Signed Transfer Transaction

```ts
const transaction = await Transaction
  .builder()                     // Get the initial transaction builder
  .arweaveInstance(fakeArweave)  // Provide the arweave-js instance for getting required network info
  .transfer()                    // Get the transfer transaction builder
  .target("wallet-address")      // Provide the wallet address receiving the funds
  .quantity("1")                 // Provide the amount of funds to transfer to the wallet address
  .sign();                       // Sign the transaction

const json = transaction.toJSON();

console.log(json);
// Example Output:
//
//   {
//     format: 2,
//     id: "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
//     last_tx: "102liodpz8315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l10px99do",
//     owner: <omitted for brevity>,
//     tags: [],
//     target: "wallet-address",
//     quantity: "1",
//     data: "",
//     data_size: "0",
//     data_root: <omitted for brevity>,
//     data_tree: undefined,
//     reward: "65596",
//     signature: <omitted for brevity>,
//   }
```

### Create a Signed Bundled Transaction

```ts
const transaction = await Transaction
  .builder()                     // Get the initial transaction builder
  .arweaveInstance(fakeArweave)  // Provide the arweave-js instance
  .bundle()                      // Get the bundled transaction builder
  .bundler(Bundler)              // Provide the bundler interface
  .items([                       // Provide the items to convert to data items
    "item-1",
    "item-2",
  ])
  .signingKey(testSigningKey)    // Provide the JWK (aka signing key) to sign the bundle
  .sign();                       // Sign the bundled transaction

const json = transaction.toJSON();
// Example Output:
//
//   {
//     format: 2,
//     id: "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
//     last_tx: "102liodpz8315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l10px99do",
//     owner: <omitted for brevity>,
//     tags: [
//       new Tag("QnVuZGxlLUZvcm1hdA", "YmluYXJ5"),
//       new Tag("QnVuZGxlLVZlcnNpb24", "Mi4wLjA"),
//     ],
//     target: "",
//     quantity: "0",
//     data: <omitted for brevity>,
//     data_size: "2260",
//     data_root: <omitted for brevity>,
//     data_tree: undefined,
//     reward: "65596",
//     signature: <omitted for brevity>,
//   }
```

### Parse Transaction Tags

```ts
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

console.log(tags);
// Example Output:
//
// {
//   Hello: "World"
// }
```
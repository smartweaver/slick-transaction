# Slick Transaction

Slick builder APIs for Arweave transaction creation

## Installation

```text
npm install @smartweaver/slick-transaction
```

## Usage

### Create a Signed Transaction

### Create a Signed Transfer Transaction

```ts
const transaction = await Transaction
  .builder()
  .arweaveInstance(fakeArweave)
  .transfer()
  .target("wallet-address")
  .quantity("1")
  .sign();

const json = transaction.toJSON();

console.log(json);
// Example Output:
//
//   {
//     format: 2,
//     id: "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
//     last_tx: "93yl0l9qof315o1p0q5hi1811kncm2rdx3o13ann8imlp3vn4pgz4l78kvvm6q54",
//     owner: "",
//     tags: [],
//     target: "wallet-address",
//     quantity: "1",
//     data: "",
//     data_size: "0",
//     data_root: "",
//     data_tree: undefined,
//     reward: "65596",
//     signature: "",
//   }
```

### Create a Signed Bundled Transaction

### Parse Transaction Tags

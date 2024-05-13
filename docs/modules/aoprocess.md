# aoprocess

A builder  for the [`@permaweb/aoconnect`](https://www.npmjs.com/package/@permaweb/aoconnect) `aoconnect` object.

## Overview

This module aims to:

- Provide reusable and extensible code that allows you to easily interact with ao processes in an idiomatic way
- Provide reusable and extensible code that works with the `@permaweb/aoconnect` library

Under the hood, this module uses the [`aoconnect`](./aoconnect.md) module. Unlike the `aoconnect` module, this module is strictly written for interacting with processes. This module comes in two implementations:

- Basic
  - Provides generic APIs that allow you to interact with ao processes
  - Used as the foundation for the Token implementation
- Token
  - Specifically made for interacting with token processes
  - Has APIs that match token actions (e.g., `mint()`, burn()`, `transfer()`, etc.)

## API Guides

### Basic

#### Sending an Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

// Build the action request
const action = proc
  .action("Some-Action")
  .dataItemSigner(() => {
    // ... code that aoconnect should use to sign this `DataItem`
    // ... (e.g., aoconnect.createDataItemSigner(myWalletJwkFile))
  })
  .data("optional data")
  .tags({
    "Some-Optional-Tag": "some value",
  });

(async () => {
  // Send the action
  const messageId = await action.post();

  // Get the result
  const result = await proc.message(messageId);

  // Output the result
  // This returns the same return value as the `aoconnect.result({ ... })` the function
  console.log(result);
});
```

### Token

#### Sending a `Balance` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send a `Balance` action
  const balance = await proc.balance("some-target-address");
  console.log(balance);
});
```

#### Sending a `Balances` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send a `Balances` action
  const balances = await proc.balances();
  console.log(balances);
});
```

#### Sending a `Burn` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send a `Burn` action
  const burnResult = await proc.burn("some-target-address", "some-quantity-amount");
  console.log(burnResult);
});
```

#### Sending an `Info` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send an `Info` action
  const info = await proc.info();
  console.log(info);
});
```

#### Sending a `Mint` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send a `Mint` action
  const mintResult = await proc.balance("some-target-address", "some-quantity-amount");
  console.log(mintResult);
});
```

#### Sending a `Transfer` Action

```ts
import { Process } from "@smartweaver/slick-transaction/modules/aoprocess/Process";
import * as aoconenct from "@permaweb/aoconnect";

// Get the process client -- targeting process ID 1557
const proc = new Process(aoconnect, "1557");

(async () => {
  // Send a `Transfer` action
  const transferResult = await proc.transfer("some-recipient-address", "some-quantity-amount");
  console.log(transferResult)
});
```

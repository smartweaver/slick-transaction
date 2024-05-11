
# aoconnect

A decorator for the [`@permaweb/aoconnect`](https://www.npmjs.com/package/@permaweb/aoconnect) `aoconnect` object.

## Overview

This module wraps (aka decorates) the `aoconnect` object to provide builder pattern APIs around `aoconnect`. This module aims to:

- Make it easy to understand which ao units handle a given operation
- Provide reusable and extensible code that works with ao's units at their HTTP endpoints
- Provide reusable and extensible code that works with the `@permaweb/aoconnect` library

Under the hood, this module uses lower level APIs in the [`ao`](../../src/ao) module. The `ao` module provides direct HTTP access to ao's units. However, unlike `@permaweb/aoconnect`, it does not (and will not) provide built-ins to handle caching, redirections, and other features that `@permaweb/aoconnect` provides. The `ao` module is intended to be used as low level APIs that should be extended.

## API Guides

### Compute Unit

#### Send a message to get the result of a message sent to a process

This method chain will send an HTTP GET request to the Compute Unit for the message result. The response will be the message result associated with the message and process IDs you provide.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-contract/modules/aoconnect/Client";

// Create new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()            // Access the Compute Unit methods
  .result()        // Access the Compute Unit message result methods
  .message("1447") // Provide the ID of the message you want to get the result of
  .process("1557") // Provide the process ID where the message was sent to
  .get();          // Get the message result (calls HTTP GET under the hood -- hence the method name)

// Output the response
console.log(response);
```

#### Send a message to get the results of messages sent to a process

This method will send an HTTP GET request to the Compute Unit for all message results. The response will be all message results for the process ID you provide.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-contract/modules/aoconnect/Client";

// Create new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()            // Access the Compute Unit methods
  .results()       // Access the Compute Unit results methods
  .process("1557") // Provide the process ID you want to get messages from
  .limit(25)       // Optionally, provide a number of messages to return
  .from("cursor")  // Optionally, provide a starting point cursor
  .to("cursor")    // Optionally, provide a endpoint point cursor
  .sort("DESC")    // Optionally, provide a sort order of the returned results (DESC|ASC)
  .get();          // Get the results (calls HTTP GET under the hood -- hence the method name)

// Output the repsonse
console.log(response);
```

#### Send a message to a process (DryRun)

This method chain will send an HTTP POST request to the Compute Unit containing the DryRun information you provide. The response will be the result of the DryRun request.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-contract/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()                   // Access the Compute Unit methods
  .dryRun()               // Access the Compute Unit DryRun methods
  .process("1557")        // Provide the process ID you want to send this message to
  .dataItemSigner(() => { // Provide the `DataItem` signer aoconnect should use
    // ... code here
  })
  .anchor("cursor")       // Optionally, provide a anchor cursor you want to use for this message
  .tags({                 // Optionally, send tags with the message
    "Some-Tag": "value",
  })
  .data("some data")      // Optionally, send data with the message
  .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)

// Output the repsonse
console.log(response);
```

### Messenger Unit

#### Send a message to a process

This method chain will send an HTTP POST request to the Messenger Unit. The response will be the ID assigned to the message.

> __Good to know:__
>  
>  All messages in ao are assigned a transaction ID. This transaction ID is the same transaction ID that is assigned to transactions in Arweave. Under the hood, the message is an Arweave transaction -- hence the message ID being the transaction ID.
>
> All messages are routed to the Scheduler Unit. If you wanted to, you could send a message directly to the Scheduler Unit. The result will be the same as sending the message to the Messenger Unit.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-contract/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .mu()                   // Access the Messenger Unit methods
  .message()              // Access the Messenger Unit message methods
  .process("1557")        // Provide the process ID you want to send this message to
  .dataItemSigner(() => { // Provide the `DataItem` signer aoconnect should use for this message
    // ... code here
  })
  .anchor("cursor")       // Optionally, provide a anchor cursor you want to use for this message
  .tags({                 // Optionally, send tags with this message
    "Some-Tag": "value",
  })
  .data("some data")      // Optionally, send data with this message
  .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)

// Output the repsonse
console.log(response);
```

#### Send a message to spawn a new process

This method chain will send an HTTP POST request to the Messenger Unit.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-contract/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .mu()                   // Access the Messenger Unit methods
  .spawn()                // Access the process spawner methods
  .dataItemSigner(() => { // Provide the `DataItem` signer aoconnect should use for this message
    // ... code here
  })
  .anchor("cursor")       // Optionally, provide a anchor cursor you want to use for this message
  .tags({                 // Optionally, send tags with this message
    "Some-Tag": "value",
  })                  
  .data("some data")      // Optionally, send data with this message
  .post();                // Send the request (calls HTTP POST under the hood)

// Output the repsonse
console.log(response);
```


# aoconnect

A decorator for the [`@permaweb/aoconnect`](https://www.npmjs.com/package/@permaweb/aoconnect) `aoconnect` interface.

## Overview

This module wraps (aka decorates) an `aoconnect` interface to make ao request and message object creation simple. This module aims to:

- Make it easy to [understand which ao units handle a given operation](#idiomatic-apis)
- Provide reusable and extensible code that works with ao's units at their HTTP endpoints
- Provide reusable and extensible code that works with the `@permaweb/aoconnect` library (or library that matches its interfaces)

Under the hood, this module uses lower level APIs in the [`ao`](./ao.md) module. The `ao` module provides direct HTTP access to ao's units. However, unlike `@permaweb/aoconnect`, it does not (and will not) provide built-ins to handle caching, redirections, and other features that `@permaweb/aoconnect` provides. The `ao` module is intended to be used as low level APIs that should be extended.

If you are interested in seeing how aoconnect's syntax maps to this module, check out the [Syntax Comparison](#syntax-comparison) below.

## Quickstart

_Note: The code below assumes you are using ESM modules._

1. Install [`@permaweb/aoconnect`](https://www.npmjs.com/package/@permaweb/aoconnect).

    ```text
    npm install @permaweb/aoconnect
    ```

1. Install [`@smartweaver/slick-transaction`](https://www.npmjs.com/package/@smartweaver/slick-transaction).

    ```text
    npm install @smartweaver/slick-transaction
    ```

1. Create an `app.js` file. You can copy the [`examples/aoconnect/app.js`](../../examples/aoconnect/app.js) as inspiration.

1. Follow one of the [API Guides](#api-guides) below -- adding the code to your `app.js` file. For example, get a message result:

    ```js
    // File: app.js

    import * as aoconnect from "@permaweb/aoconnect";
    import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client.js";

    // Create new decorated aoconnect client
    const client = new Client(aoconnect);

    const msgId = "wSbmo3kkzDGWNEziIAiIybob1VsiIsVqp0i0siX8QfQ";
    const procId = "G3vHz_3XOUAzzVciJCnDf0NLRjbL6bjwRT5mAclrLrk";

    (async () => {
      const response = await client
        .cu()            // Access the Compute Unit methods
        .result()        // Access the Compute Unit's "message result" methods
        .message(msgId)  // Provide the ID of the message you want to get the result of
        .process(procId) // Provide the process ID where the message was sent to
        .get();          // Get the message result (calls HTTP GET under the hood -- hence the method name)

      // Output the response
      console.log(response);
    })();
    ```

1. Run your `app.js` file.

    ```text
    node app.js
    ```

## API Guides

### Compute Unit

#### Send a message to get the result of a message sent to a process

This method chain will send an HTTP GET request to the Compute Unit for the message result. The response will be the message result associated with the message and process IDs you provide.

```ts
import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client";

// Create new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()            // Access the Compute Unit methods
  .result()        // Access the Compute Unit's "message result" methods
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
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client";

// Create new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()            // Access the Compute Unit methods
  .results()       // Access the Compute Unit's results methods to get results from a process
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
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .cu()                   // Access the Compute Unit methods
  .dryRun()               // Access the Compute Uni's  DryRun methods to send a DryRun message to a process
  .process("1557")        // Provide the process ID you want to send this message to
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
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .mu()                   // Access the Messenger Unit methods
  .message()              // Access the Messenger Unit's message methods to send a message to a process
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
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client";

// Create a new decorated aoconnect client
const client = new Client(aoconnect);

const response = await client
  .mu()                   // Access the Messenger Unit methods
  .spawn()                // Access the Messgener Unit's spawn methods to spawn a new process
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

## Syntax Comparison

The code below shows the syntax comparison between `@permaweb/aoconnect` and Slick Transaction's `aoconnect` module. The `import` statements and some code have been omitted for brevity.

<table>
  <thead>
    <tr>
      <td><strong>aoconnect</strong></td>
      <td><strong>Slick Transaction</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
<td>

```ts
////////////////////////////////////////////////////////////
//
// Get a message result
//
const response = await result({


  message: "1447",
  process: "1557",
});

////////////////////////////////////////////////////////////
//
// Get message results
//
const response = await results({


  process: "1557",
  from: "cursor",
  to: "cursor",
  sort: "DESC",
  limit: 25,
});

////////////////////////////////////////////////////////////
//
// Send a message
//
const messageId = await message({


  process: "1557",
  signer: /* DataItem signer code here */,


  anchor: "cursor",
  data: "some data",
  tags: [
    { name: "Some-Tag", value: "value" },
  ],
});

////////////////////////////////////////////////////////////
//
// Send a DryRun message
//
const result = await dryrun({


  process: "1557",
  data: "some data",
  tags: [
    { name: "Action", value: "Balance" }
  ],
  anchor: "cursor",
});

////////////////////////////////////////////////////////////
//
// Spawn a new process
//
const processId = await spawn({
  

  signer: /* DataItem signer code here */,

  
  module: "1667",
  scheduler: "1887",
  tags: [
    { name: "Some-Tag", value: "value" },
  ],
  data: "some data",
});
```

</td>
<td>

```ts
////////////////////////////////////////////////////////////
//
// Get a message result
//
const response = await client
  .cu()                   // Access the Compute Unit methods
  .result()               // Access the Compute Unit's "message result" methods
  .message("1447")        // Provide the ID of the message you want to get the result of
  .process("1557")        // Provide the process ID where the message was sent to
  .get();                 // Get the message result (calls HTTP GET under the hood -- hence the method name)

////////////////////////////////////////////////////////////
//
// Get message results
//
const response = await client
  .cu()                   // Access the Compute Unit methods
  .results()              // Access the Compute Unit's results methods to get results from a process
  .process("1557")        // Provide the process ID you want to get messages from
  .from("cursor")         // Optionally, provide a starting point cursor
  .to("cursor")           // Optionally, provide a endpoint point cursor
  .sort("DESC")           // Optionally, provide a sort order of the returned results (DESC|ASC)
  .limit(25)              // Optionally, provide a number of messages to return
  .get();                 // Get the results (calls HTTP GET under the hood -- hence the method name)

////////////////////////////////////////////////////////////
//
// Send a message
//
const response = await client
  .mu()                   // Access the Messenger Unit methods
  .message()              // Access the Messenger Unit's message methods to send a message to a process
  .process("1557")        // Provide the process ID you want to send this message to
  .dataItemSigner(() => { // Provide the `DataItem` signer aoconnect should use for this message
    // ... code here      //
  })                      //
  .anchor("cursor")       // Optionally, provide a anchor cursor you want to use for this message
  .data("some data")      // Optionally, send data with this message
  .tags({                 // Optionally, send tags with this message
    "Some-Tag": "value",  //
  })                      //
  .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)

////////////////////////////////////////////////////////////
//
// Send a DryRun message
//
const response = await client
  .cu()                   // Access the Compute Unit methods
  .dryRun()               // Access the Compute Uni's  DryRun methods to send a DryRun message to a process
  .process("1557")        // Provide the process ID you want to send this message to
  .data("some data")      // Optionally, send data with the message
  .tags({                 // Optionally, send tags with the message
    "Action": "Balance",  //
  })                      //
  .anchor("cursor")       // Optionally, provide a anchor cursor you want to use for this message
  .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)

////////////////////////////////////////////////////////////
//
// Spawn a new process
//
const response = await client
  .mu()                   // Access the Messenger Unit methods
  .spawn()                // Access the Messgener Unit's spawn methods to spawn a new process
  .dataItemSigner(() => { // Provide the `DataItem` signer aoconnect should use for this message
    // ... code here      //
  })                      //
  .module("1667")         // Optionally, provide the module this process should use
  .schduler("1887")       // Optionally, provide the Scheduler Unit to handle the process
  .tags({                 // Optionally, send tags with this message
    "Some-Tag": "value",  //
  })                      //
  .data("some data")      // Optionally, send data with this message
  .post();                // Send the request (calls HTTP POST under the hood)
```
  
</td>
    </tr>
  </tbody>
</table>

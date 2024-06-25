import * as aoconnect from "@permaweb/aoconnect";
import { Client } from "@smartweaver/slick-transaction/modules/aoconnect/Client.js";

const wallet = {}                                      // Replace with your wallet JWK object here
const signer = aoconnect.createDataItemSigner(wallet); // Create the `DataItem` signer that aoconnect will use
const client = new Client(aoconnect);                  // Create Slick Transaction's aoconnect decorator

(async () => {
  const msgId = "wSbmo3kkzDGWNEziIAiIybob1VsiIsVqp0i0siX8QfQ";
  const procId = "G3vHz_3XOUAzzVciJCnDf0NLRjbL6bjwRT5mAclrLrk";

  // Get a message result
  const messageResult = await client
    .cu()                   // Access the Compute Unit methods
    .result()               // Access the Compute Unit's "message result" methods
    .message(msgId)         // Provide the ID of the message you want to get the result of
    .process(procId)        // Provide the process ID where the message was sent to
    .get();                 // Get the message result (calls HTTP GET under the hood -- hence the method name)
  console.log({ messageResult })

  // Get message results
  const results = await client
    .cu()                   // Access the Compute Unit methods
    .results()              // Access the Compute Unit's results methods to get results from a process
    .process(procId)        // Provide the process ID you want to get messages from
    .limit(25)              // Optionally, provide a number of messages to return
    .sort("DESC")           // Optionally, provide a sort order of the returned results (DESC|ASC)
    .get();                 // Get the results (calls HTTP GET under the hood -- hence the method name)
  console.log({ results })

  // Send a DryRun message
  const dryRunResult = await client
    .cu()                   // Access the Compute Unit methods
    .dryRun()               // Access the Compute Uni's  DryRun methods to send a DryRun message to a process
    .process(procId)        // Provide the process ID you want to send this message to
    .tags({                 // Optionally, send tags with the message
      "Action": "Mint",
      "Quantity": "100",
      "Recipient": ""
    })
    .data("some data")      // Optionally, send data with the message
    .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)
  console.log({ dryRunResult: dryRunResult.Messages[0] })

  // Send a message
  const messageId = await client
    .mu()                   // Access the Compute Unit methods
    .message()              // Access the Compute Uni's  DryRun methods to send a DryRun message to a process
    .process(procId)        // Provide the process ID you want to send this message to
    .tags({                 // Optionally, send tags with the message
      "Action": "Mint",
      "Quantity": "100",
      "Recipient": ""
    })
    .dataItemSigner(signer) // Ensure this message can be signed when it is sent to ao
    .data("some data")      // Optionally, send data with the message
    .post();                // Send the message (calls HTTP POST under the hood -- hence the method name)
  console.log({ messageId });

  // Get the result of the message that was sent above
  const lastMessageResult = await client
    .cu()                   // Access the Compute Unit methods
    .result()               // Access the Compute Unit's "message result" methods
    .message(messageId)     // Provide the ID of the message you want to get the result of
    .process(procId)        // Provide the process ID where the message was sent to
    .get();                 // Get the message result (calls HTTP GET under the hood -- hence the method name)
  console.log({ lastMessageResult });

  const moduleId = "1SafZGlZT4TLI8xoc0QEQ4MylHhuyQUblxD8xLKvEKI";
  const schedulerId = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";

  // Spawn a new process
  const newProcessId = await client
    .mu()                   // Access the Messenger Unit methods
    .spawn()                // Access the Messgener Unit's spawn methods to spawn a new process
    .dataItemSigner(signer) // Ensure this message can be signed when it is sent to ao
    .module(moduleId)       // Provide the ID of the module this process should use
    .scheduler(schedulerId) // Provide the ID of the Scheduler Unit that will handle this process
    .data("some data")      // Optionally, send data with this message
    .post();                // Send the request (calls HTTP POST under the hood)

  console.log({ newProcess: `https://www.ao.link/#/entity/${newProcessId}` });
})();

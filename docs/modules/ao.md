# ao

__This module's documentation is still a work in progress. Code has not been fully exercised manually. If you find issues with these APIs, please file an issue. Thanks!__

A builder pattern module intended to **closely** match the endpoints they target through idomatic method names and parameters.

## Overview

### Calling Fetch Under the Hood

The methods in this module are intended to **closely** match the endpoint they target. All methods call the `fetch` API under the hood to call HTTP methods. The called HTTP method is recognizable by its name. For example, getting a Scheduler Unit's information is done using a GET method. That GET method looks like the following:

```ts
// GET {su-url}/
//
const repsonse = su.get();
```

The `get()` method above calls the `fetch` API with a `GET` method under the hood.

### The Response Returned From Methods

All [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects returned by `fetch` calls under the hood get their [`json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) method called. This means all HTTP-related methods (e.g., `get()`, `post()`) return JSON unless otherwise stated in their docblock.

## API Guides

### Compute Unit

```ts
import { Client } from "@smartweaver/slick-transaction/modules/ao/Client";

const ao = new Client();
const cu = ao.cu(); // or pass in a Compute Unit URL => const cu = ao.cu("cu-url-here");

// GET {cu-url}/
//
const response = cu.get();

// GET {cu-url}/result/{message-id}?process-id={process-id}
// GET {cu-url}/result/1447        ?process-id=1557
//
const response = cu.result().message("1447").get({ query: { "process-id": "1557" } });

// GET {cu-url}/results/{process-id}?from={timestamp-string}&to={timestamp-string}&limit={limit}&sort={"ASC"|"DESC"}
// GET {cu-url}/results/1557        ?from=1715039710324     &to=1715039720324     &limit=25     &sort=DESC
//
const response = cu.results().process("1557").get({ query: { from: "1715039710324", to: "1715039720324", limit: 25, sort: "DESC" } });

// GET {cu-url}/cron/{process-id}?from={timestamp-string}&to={timestamp-string}
// GET {cu-url}/cron/1557        ?from=1715039710324     &to=1715039720324
//
const response = cu.cron().process("1557").get({ query: { from: "1715039710324", to: "1715039720324" } });

// GET {cu-url}/state/{process-id}?to={timestamp-string}
// GET {cu-url}/state/1557        ?to=1712967091755
//
const response = cu.state().process("1557").get({ query: "1712967091755" });

// POST {cu-url}/dry-run?process-id={process-id}
// POST {cu-url}/dry-run?process-id=1557
//
const response = cu.dryRun().post({ "process-id": "1557" });
```

### Messenger Unit

```ts
import { Client } from "@smartweaver/slick-transaction/modules/ao/Client";

const ao = new Client();
const mu = ao.mu(); // or pass in a Messenger Unit URL => const mu = ao.mu("mu-url-here");

// GET {mu-url}?debug={boolean}&process={process-id}&message={message-id}&page={number}&page-size={number}
// GET {mu-url}?debug=true     &process=1557        &message=1447        &page=1       &page-size=5
//
const repsonse = mu.get({ query: { debug: true, process: "1557", message: "1447", page: 1, "page-size": 5 } });

// POST {mu-url}/
//
const repsonse = mu.post({ body: /* ArrayBuffer */ });

// POST {mu-url}/monitor/{process-id}
// POST {mu-url}/monitor/1557
//
const repsonse = mu.monitor().process("1557").post();

// DELETE {mu-url}/monitor/{process-id}
// DELETE {mu-url}/monitor/1557
//
const repsonse = mu.monitor().process("1557").delete();
```

### Scheduler Unit

```ts
import { Client } from "@smartweaver/slick-transaction/modules/ao/Client";

const ao = new Client();
const su = ao.su(); // or pass in a Scheduler Unit URL => const su = ao.mu("su-url-here");

// GET {su-url}/
//
const repsonse = su.get();

// GET {su-url}/{message-id}?process-id={process-id}
// GET {su-url}/1447        ?process-id=1557
//
const repsonse = su.message("1447").get({ query: { "process-id": "1557" } });

// GET {su-url}/{process-id}
// GET {su-url}/1557
//
const repsonse = su.process("1557").get();

// GET {su-url}/{process-id}?from={timestamp-string}&to={timestamp-string}
// GET {su-url}/1557        ?from=1715039710324     &to=1715039720324
//
const repsonse = su.process("1557").get({ query: { from: "1715039710324", to: "1715039720324" } });

// GET {su-url}/processes/{process-id}
// GET {su-url}/processes/1557
//
const repsonse = su.processes().process("1557").get();

// GET {su-url}/timestamp?process-id={process-id}
// GET {su-url}/timestamp?process-id/1557
//
const repsonse = su.timestamp().get({ query: { "process-id": "1557" } });
```

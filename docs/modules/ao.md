# ao

A builder pattern module intended to __closely__ match the endpoints they target through idomatic method names and parameters.

## Overview

### Calling Fetch Under the Hood

The methods in this module are intended to __closely__ match the endpoint they target. All methods call the `fetch` API under the hood to call HTTP methods. The called HTTP method is recognizable by its name. For example, getting a Scheduler Unit's information is done using a GET method. That GET method looks like the following:

```ts
// GET {su-url}/
//
const repsonse = ao().su().get();
```

The `get()` method above calls the `fetch` API with a `GET` method under the hood.

### The Response Returned From Methods

All [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects returned by `fetch` calls under the hood get their [`json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) method called. This means all HTTP-related methods (e.g., `get()`, `post()`) return JSON unless otherwise stated in their docblock.

## API Guides

__Currently a work in progress__

```ts
import { ao } from "@smartweaver/slick-transaction/modules/ao/Client";

// GET {su-url}/
//
const repsonse = ao().su().get();

// GET {su-url}/{message-id}?process-id={process-id}
// GET {su-url}/1447        ?process-id=1557
//
const repsonse = ao().su().message("1447").get({ query: { "process-id": "1557" } });

// GET {su-url}/{process-id}
// GET {su-url}/1557
//
const repsonse = ao().su().process("1557").get();

// GET {su-url}/{process-id}?from={timestamp-string}&to={timestamp-string}
// GET {su-url}/1557        ?from=1715039710324     &to=1715039720324
//
const repsonse = ao().su().process("1557").get({ from: "1715039710324", to: "1715039720324" });

// GET {su-url}/processes/{process-id}
// GET {su-url}/processes/1557
//
const repsonse = ao().su().processes().process("1557").get();

// GET {su-url}/timestamp?process-id={process-id}
// GET {su-url}/timestamp?process-id/1557
//
const repsonse = ao().su().timestamp().get({ "process-id": "1557" });
```

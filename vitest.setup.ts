import { vi } from "vitest";

vi.stubGlobal("fetch", () => {
  throw new Error("Call to fetch() not allowed in tests")
});

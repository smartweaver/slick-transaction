export declare namespace HTTPRequest {
  type URLQueryParamsWithProcessId<T = unknown> = T & {
    /** The target process' ID. */
    ["process-id"]: string;
  };
}

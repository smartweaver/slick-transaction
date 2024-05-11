export interface MessengerUnit {
  /**
   * Make a `fetch` request using this unit's URL as the request's base URL.
   *
   * @param path The path to append to this unit's base URL.
   * @param requestInit (Optional) Options to pass to the `fetch` API.
   * @returns The result of the `fetch` call.
   */
  fetch(path: string, requestInit?: RequestInit);

  /**
   * Send a message to this unit.
   *
   * @param options Options to pass to the request.
   * @returns The message ID.
   */
  post(options: PostOptions): Promise<string>;
}

export type GetOptions = {
  query: {
    /** Toggles debug mode */
    debug?: boolean;

    /** The process ID to debug */
    process?: string;

    /** The message ID to debug */
    message?: string;

    /** The page number */
    page?: number;

    /** The number of items per page */
    "page-size"?: number;
  };
} & RequestInit;

export type PostOptions = {
  body: ArrayBuffer;
} & RequestInit;

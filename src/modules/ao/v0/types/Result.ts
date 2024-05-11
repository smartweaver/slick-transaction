type Output = { prompt: string; data: unknown; print: boolean };

export type Result<
  M extends unknown[] = unknown[],
  A extends unknown[] = unknown[],
  S extends unknown[] = unknown[],
  E extends unknown = unknown,
  O extends Output = Output,
> = {
  /** An array of outbox messages as a result of evaluating the message. */
  Messages: M;
  /** (undocumented) */
  Assignments?: A;
  /** An array of outbox spawns as a result of evaluating the message. */
  Spawns: S;
  /** A string or object as a result of evaluating the message. */
  Output: O;
  /** A string or object that indicates an error occurred as a result of evaluating the message. */
  Error?: E;
  /** The amount of gas used for this result. */
  GasUsed?: number;
};

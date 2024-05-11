type Output = { prompt: string; data: unknown; print: boolean };

export type DryRunResult<
  M extends unknown[] = unknown[],
  S extends unknown[] = unknown[],
  E extends unknown = unknown,
  O extends Output = Output,
> = {
  /** An array of outbox messages as a result of evaluating the message. */
  Messages: M;
  /** An array of outbox spawns as a result of evaluating the message. */
  Spawns: S;
  /** A string or object as a result of evaluating the message. */
  Output: O;
  /** A string or object that indicates an error occurred as a result of evaluating the message. */
  Error?: E;
};

/**
 * The JSON Web Key schema.
 * @see https://datatracker.ietf.org/doc/html/rfc7517 for more information on JWKs.
 */
export interface JWK {
  kty: string;
  e: string;
  n: string;
  d?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
}

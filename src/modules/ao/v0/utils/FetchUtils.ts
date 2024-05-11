export function urlToBaseUrl(url: string) {
  if (!url) {
    throw new Error(`Cannot set URL to undefined`);
  }

  if (typeof url !== "string") {
    throw new Error(`Cannot set URL to non-string`);
  }

  if (url.charAt(url.length - 1) === "/") {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

export function kvpToQueryParamsString(params: Record<string, string>) {
  if (!params) {
    return "";
  }

  if (!Object.keys(params).length) {
    return "";
  }

  return "?" + new URLSearchParams(params).toString();
}

export function hasParams(
  urlQueryParams: Record<string, string>,
  keys: string[],
) {
  const missing: string[] = [];

  for (const key of keys) {
    if (!(key in urlQueryParams)) {
      missing.push(key);
    }
  }

  return {
    has_missing_params: missing.length > 0,
    missing: missing.join(", "),
  };
}

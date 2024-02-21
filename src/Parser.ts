import { ArweaveTag } from "../deps";

class TagsParser {
  toKeyValuePairs(
    tags: ArweaveTag[],
    options: {
      decode: true;
    } = {
      decode: true,
    },
  ) {
    const ret: Record<string, string> = {};

    tags.forEach((tag) => {
      const name = tag.get("name", { decode: options.decode, string: true });
      const value = tag.get("value", { decode: options.decode, string: true });
      ret[name] = value;
    });

    return ret;
  }
}

export class Parser {
  tags() {
    return new TagsParser();
  }
}

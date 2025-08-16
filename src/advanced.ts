/** Advanced pattern helpers and small builders. */
export const advanced = {
  /** Positive lookahead fragment */
  lookahead: (pattern: string) => `(?=${pattern})`,
  /** Negative lookahead fragment */
  negativeLookahead: (pattern: string) => `(?!${pattern})`,
  /** Positive lookbehind fragment */
  lookbehind: (pattern: string) => `(?<=${pattern})`,
  /** Negative lookbehind fragment */
  negativeLookbehind: (pattern: string) => `(?<!${pattern})`,

  /** Wrap as a non-capturing group */
  nonCapturing: (pattern: string) => `(?:${pattern})`,
  /** Named capturing group */
  namedGroup: (name: string, pattern: string) => `(?<${name}>${pattern})`,
  /** Either/or */
  or: (...patterns: string[]) => `(?:${patterns.join("|")})`,
  /** Character class any-of */
  anyOf: (chars: string) => `[${chars}]`,
  /** Character class none-of */
  noneOf: (chars: string) => `[^${chars}]`,
  /** Repeat {n} or {min,max} */
  repeat: (pattern: string, min: number, max?: number, lazy = false) =>
    advanced.nonCapturing(pattern) +
    "{" +
    (max == null ? min : min + "," + max) +
    "}" +
    (lazy ? "?" : ""),
  /** Optional */
  optional: (pattern: string, lazy = false) =>
    `${advanced.nonCapturing(pattern)}?${lazy ? "?" : ""}`,
  /** One or more */
  oneOrMore: (pattern: string, lazy = false) =>
    `${advanced.nonCapturing(pattern)}+${lazy ? "?" : ""}`,
  /** Zero or more */
  zeroOrMore: (pattern: string, lazy = false) =>
    `${advanced.nonCapturing(pattern)}*${lazy ? "?" : ""}`,
  /** Anchors */
  startsWith: (pattern: string) => new RegExp(`^${pattern}`),
  endsWith: (pattern: string) => new RegExp(`${pattern}$`),
  /** Word boundary wrappers */
  word: (pattern: string) => new RegExp(`\\b(?:${pattern})\\b`, "g"),
  notWordBoundary: () => /\B/g,

  /** Build a RegExp with flags from a source string */
  build: (source: string, flags: string = "g") => new RegExp(source, flags),
};

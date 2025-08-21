/** Utilities to ensure RegExp from string safely */
const toRegExp = (pattern: string | RegExp, flags = "g"): RegExp =>
  pattern instanceof RegExp ? pattern : new RegExp(pattern, flags);

/**
 * String transformation helpers (all pure and chainable via index.ts)
 */
export const transformations = {
  /** Remove all whitespace
   * @param str The input string
   * @returns The modified string with all whitespace removed
   * @example
   * regexify.noSpace("  hello   world  "); // "helloworld"
   * regexify("  hello   world  ").noSpace().result(); // "helloworld"
   * @description
   * This transformation removes all whitespace characters from the string.
   * It uses a regex to match any whitespace and replaces it with an empty string.
   */
  noSpace: (str: string) => str.replace(/\s+/g, ""),

  /** Collapse runs of whitespace to a single space and trim
   * @param str The input string
   * @returns The modified string with consecutive spaces collapsed to one and trimmed
   * @example
   * regexify.collapseSpaces("  hello   world  "); // "hello world"
   * regexify("  hello   world      ").collapseSpaces().result(); // "hello world"
   * @description
   * This transformation replaces multiple consecutive whitespace characters with a single space,
   * and trims leading/trailing spaces. It uses a regex to match runs of whitespace.
   */
  collapseSpaces: (str: string) => str.replace(/\s+/g, " ").trim(),

  /** Trim both ends
   * @param str The input string
   * @returns The modified string with leading and trailing whitespace removed
   * @example
   * regexify.trim("  hello world  "); // "hello world"
   * regexify("  hello world  ").trim().result(); // "hello world"
   * @description
   * This transformation removes whitespace from both ends of the string.
   * It uses the native String.trim() method for efficiency.
   */
  trim: (str: string) => str.trim(),

  /** Trim left
   * @param str The input string
   * @returns The modified string with leading whitespace removed
   * @example
   * regexify.trimLeft("  hello world  "); // "hello world  "
   * regexify("  hello world  ").trimLeft().result(); // "hello world  "
   * @description
   * This transformation removes whitespace from the start of the string.
   * It uses a regex to match leading whitespace and replace it with an empty string.
   */
  trimLeft: (str: string) => str.replace(/^\s+/, ""),
  /** Trim right
   * @param str The input string
   * @returns The modified string with trailing whitespace removed
   * @example
   * regexify.trimRight("  hello world  "); // "  hello world"
   * regexify("  hello world  ").trimRight().result(); // "  hello world"
   * @description
   * This transformation removes whitespace from the end of the string.
   * It uses a regex to match trailing whitespace and replace it with an empty string.
   */
  trimRight: (str: string) => str.replace(/\s+$/, ""),

  /** Keep only digits
   * @param str The input string
   * @returns The modified string with only digits kept
   * @example
   * regexify.onlyNumbers("abc123xyz"); // "123"
   * regexify("abc123xyz").onlyNumbers().result(); // "123"
   * @description
   * This transformation removes all non-digit characters from the string.
   * It uses a regex to match any character that is not a digit and replaces it with an empty string.
   */
  onlyNumbers: (str: string) => str.replace(/\D+/g, ""),

  /** Remove digits
   * @param str The input string
   * @returns The modified string with all digits removed
   * @example
   * regexify.removeNumbers("abc123xyz"); // "abcxyz"
   * regexify("abc123xyz").removeNumbers().result(); // "abcxyz"
   * @description
   * This transformation removes all digit characters from the string.
   * It uses a regex to match any digit and replaces it with an empty string.
   */
  removeNumbers: (str: string) => str.replace(/\d+/g, ""),

  /** Keep only letters (ASCII)
   * @param str The input string
   * @returns The modified string with only letters kept
   * @example
   * regexify.onlyLetters("abc123XYZ!@#"); // "abcXYZ"
   * regexify("abc123XYZ!@#").onlyLetters().result(); // "abcXYZ"
   * @description
   * This transformation removes all non-letter characters from the string.
   * It uses a regex to match any character that is not a letter and replaces it with an empty string.
   */
  onlyLetters: (str: string) => str.replace(/[^A-Za-z]+/g, ""),
  /** Remove letters (ASCII)
   * @param str The input string
   * @returns The modified string with all letters removed
   * @example
   * regexify.removeLetters("abc123XYZ!@#"); // "123!@#"
   * regexify("abc123XYZ!@#").removeLetters().result(); // "123!@#"
   * @description
   * This transformation removes all letter characters from the string.
   * It uses a regex to match any letter and replaces it with an empty string.
   */
  removeLetters: (str: string) => str.replace(/[A-Za-z]+/g, ""),

  /** Keep only alphanumerics
   * @param str The input string
   * @returns The modified string with only alphanumeric characters kept
   * @example
   * regexify.onlyAlphanumerics("abc123!@#"); // "abc123"
   * regexify("abc123!@#").onlyAlphanumerics().result(); // "abc123"
   * @description
   * This transformation removes all non-alphanumeric characters from the string.
   * It uses a regex to match any character that is not a letter or digit and replaces it with an empty string.
   */
  onlyAlphanumerics: (str: string) => str.replace(/[^A-Za-z0-9]+/g, ""),
  /** Remove non-alphanumerics
   * @param str The input string
   * @returns The modified string with all non-alphanumeric characters removed
   * @example
   * regexify.removeNonAlphanumerics("abc123!@#"); // "abc123!@#"
   * regexify("abc123!@#").removeNonAlphanumerics().result(); // "abc123!@#"
   * @description
   * This transformation removes all alphanumeric characters from the string.
   * It uses a regex to match any letter or digit and replaces it with an empty string.
   */
  removeNonAlphanumerics: (str: string) => str.replace(/[A-Za-z0-9]+/g, ""),
  /** Remove special characters
   * @param str The input string
   * @returns The modified string with all special characters removed
   * @example
   * regexify.noSpecialChars("abc123!@#"); // "abc123"
   * regexify("abc123!@#").noSpecialChars().result(); // "abc123"
   * @description
   * This transformation removes all characters that are not letters or digits.
   * It uses a regex to match any character that is not alphanumeric and replaces it with an empty string.
   */
  noSpecialChars: (str: string) => str.replace(/[^A-Za-z0-9]+/g, ""),

  /** Replace all occurrences of pattern
   * @param str The input string
   * @param pattern The regex pattern to match
   * @param replacement The string to replace matches with
   * @example
   * regexify.replaceAll("abc abc", "abc", "xyz"); // "xyz xyz"
   * regexify("abc abc").replaceAll("abc", "xyz").result(); // "xyz xyz"
   * @description
   * This transformation replaces all occurrences of a pattern in the string.
   * It uses a regex to find matches and replaces them with the specified replacement string.
   */
  replaceAll: (str: string, pattern: string | RegExp, replacement: string) =>
    str.replace(
      toRegExp(pattern, pattern instanceof RegExp ? pattern.flags : "g"),
      replacement
    ),
  /** Replace first occurrence
   * @param str The input string
   * @param pattern The regex pattern to match
   * @param replacement The string to replace the first match with
   * @example
   * regexify.replaceFirst("abc abc", "abc", "xyz"); // "xyz abc"
   * regexify("abc abc").replaceFirst("abc", "xyz").result(); // "xyz abc"
   * @description
   * This transformation replaces the first occurrence of a pattern in the string.
   * It uses a regex to find the first match and replaces it with the specified replacement string.
   */
  replaceFirst: (str: string, pattern: string | RegExp, replacement: string) =>
    str.replace(
      toRegExp(pattern, pattern instanceof RegExp ? pattern.flags : ""),
      replacement
    ),

  /** Replace last occurrence by scanning from right
   * @param str The input string
   * @param pattern The regex pattern to match
   * @param replacement The string to replace the last match with
   * @example
   * regexify.replaceLast("abc abc", "abc", "xyz"); // "abc xyz"
   * regexify("abc abc").replaceLast("abc", "xyz").result(); // "abc xyz"
   * @returns The modified string with the last occurrence replaced
   * @description
   * This transformation replaces the last occurrence of a pattern in the string.
   */
  replaceLast: (str: string, pattern: string | RegExp, replacement: string) => {
    const r = toRegExp(
      pattern,
      pattern instanceof RegExp ? pattern.flags : "g"
    );
    let m: RegExpExecArray | null;
    let lastIndex = -1;
    while ((m = r.exec(str))) lastIndex = m.index;
    return lastIndex === -1
      ? str
      : str.slice(0, lastIndex) + str.slice(lastIndex).replace(r, replacement);
  },

  /** Extract first match for a pattern
   * @param str The input string
   * @param pattern The regex pattern to match
   * @example
   * regexify.extractFirst("abc123", /\d+/); // "123"
   * regexify("abc123").extractFirst(/\d+/).result(); // "123"
   * @returns The first match found in the string, or empty string if no match
   * @description
   * This transformation extracts the first occurrence of a pattern from the string.
   * It uses a regex to find the first match and returns it.
   * If no match is found, it returns an empty string.
   */
  extractFirst: (str: string, pattern: string | RegExp) => {
    const m = RegExp(
      toRegExp(pattern, pattern instanceof RegExp ? pattern.flags : "")
    ).exec(str);
    return m ? m[0] : "";
  },

  /** Extract all matches for a pattern
   * @param str The input string
   * @param pattern The regex pattern to match
   * @example
   * regexify.extractAll("abc123abc", /\d+/g); // ["123"]
   * regexify("abc123abc").extractAll(/\d+/g).result(); // ["123"]
   * @returns An array of all matches found in the string
   * @description
   * This transformation extracts all occurrences of a pattern from the string.
   * It uses a regex to find all matches and returns them as an array.
   * If no matches are found, it returns an empty array.
   */
  extractAll: (str: string, pattern: string | RegExp) => {
    const r = toRegExp(
      pattern,
      pattern instanceof RegExp ? pattern.flags : "g"
    );
    return Array.from(str.matchAll(r), (m) => m[0]);
  },

  /** Extract named groups from first match
   * @param str The input string
   * @param pattern The regex pattern with named groups
   * @example
   * regexify.extractGroups("abc", /(?<group>a)/); // { group: "a" }
   * regexify("abc").extractGroups(/(?<group>a)/).result(); // { group: "a" }
   * @returns An object with named groups or empty object if no match
   * @description
   * This transformation extracts named groups from the first match of a regex pattern.
   * It uses the RegExp.exec() method to find the first match and returns an object with named groups.
   * If no match is found, it returns an empty object.
   */
  extractGroups: (str: string, pattern: RegExp): Record<string, string> => {
    const m = RegExp(pattern).exec(str);
    return (m && (m as any).groups) || {};
  },

  /** Split by a regex (keeps it simple)
   * @param str The input string
   * @param pattern The regex pattern to split by
   * @example
   * regexify.splitBy("one,two,three", /,/); // ["one", "two", "three"]
   * regexify("one,two,three").splitBy(/,/).result(); // ["one", "two", "three"]
   * @returns An array of strings split by the pattern
   * @description
   * This transformation splits the string by a regex pattern.
   * It uses the String.split() method with the provided regex to return an array of substrings.
   * If no matches are found, it returns an array with the original string.
   */
  splitBy: (str: string, pattern: string | RegExp) =>
    str.split(toRegExp(pattern)),

  /** Get text between the first pair of delimiters
   * @param str The input string
   * @param start The starting delimiter (string or RegExp)
   * @param end The ending delimiter (string or RegExp)
   * @example
   * regexify.between("start middle end", "start", "end"); // " middle "
   * regexify("start middle end").between("start", "end").result(); // " middle "
   * @returns The text found between the delimiters, or empty string if not found
   * @description
   * This transformation extracts the text between the first occurrence of two delimiters.
   */
  between: (str: string, start: string | RegExp, end: string | RegExp) => {
    const s =
      typeof start === "string"
        ? start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        : start.source;
    const e =
      typeof end === "string"
        ? end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        : end.source;
    const re = new RegExp(`${s}(.*?)${e}`);
    const m = RegExp(re).exec(str);
    return m ? m[1] : "";
  },
  /** Get all texts between delimiters (non-overlapping)
   * @param str The input string
   * @param start The starting delimiter (string or RegExp)
   * @param end The ending delimiter (string or RegExp)
   * @example
   * regexify.betweenAll("start1 middle1 end1 start2 middle2 end2", "start", "end"); // ["1 middle1 ", "2 middle2 "]
   * regexify("start1 middle1 end1 start2 middle2 end2").betweenAll("start", "end").result(); // ["1 middle1 ", "2 middle2 "]
   * @returns An array of strings found between the delimiters
   * @description
   * This transformation extracts all occurrences of text between pairs of delimiters.
   * It uses a regex to find all matches and returns them as an array.
   */
  betweenAll: (str: string, start: string | RegExp, end: string | RegExp) => {
    const s =
      typeof start === "string"
        ? start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        : start.source;
    const e =
      typeof end === "string"
        ? end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        : end.source;
    const re = new RegExp(`${s}(.*?)${e}`, "g");
    return Array.from(str.matchAll(re), (m) => m[1]);
  },

  /** Remove HTML tags
   * @param str The input string
   * @returns The modified string with HTML tags removed
   * @example
   * regexify.stripHtml("<p>Hello</p>"); // "Hello"
   * regexify("Hello").stripHtml().result(); // "Hello"
   * @description
   * This transformation removes HTML tags from the string.
   * It uses a regex to match HTML tags and replaces them with an empty string.
   * If no tags are found, the original string is returned unchanged.
   */
  stripHtml: (str: string) => str.replace(/<[^>]+>/g, ""),

  /** Squeeze consecutive spaces into one */
  squeezeSpaces: (str: string) => str.replace(/ +/g, " "),

  /** Mask everything except the last N chars
   * @param str The input string
   * @param visible The number of characters to keep visible at the end (default: 4)
   * @param maskChar The character to use for masking (default: '*')
   * @returns The modified string with all but the last N chars masked
   * @example
   * regexify.maskTail("SensitiveData", 4); // "********Data"
   * regexify("SensitiveData").maskTail().result(); // "********Data"
   * @description
   * This transformation masks all characters in the string except for the last N characters.
   * It uses a regex to match all but the last N characters and replaces them with the specified mask character.
   * If the string is shorter than N, it returns the original string unchanged.
   */
  maskTail: (str: string, visible = 4, maskChar = "*") =>
    str.replace(new RegExp(`.(?=.{${visible}})`, "g"), maskChar),

  /** Redact matches of a pattern
   * @param str The input string
   * @param pattern The regex pattern to match for redaction
   * @param label The label to replace matches with (default: "[REDACTED]")
   * @returns The modified string with matches replaced by the label
   * @example
   * regexify.redact("Sensitive data here", /\bdata\b/, "[REDACTED]"); // "Sensitive [REDACTED] here"
   * regexify("Sensitive data here").redact(/\bdata\b/, "[REDACTED]").result(); // "Sensitive [REDACTED] here"
   * @description
   * This transformation replaces all occurrences of a pattern in the string with a label.
   * It uses a regex to find matches and replaces them with the specified label.
   * If no matches are found, the original string is returned unchanged.
   */
  redact: (str: string, pattern: string | RegExp, label = "[REDACTED]") =>
    str.replace(toRegExp(pattern, "g"), label),

  /** Pad numeric substrings to a fixed width: img2 -> img0002
   * @param str The input string
   * @param width The width to pad numbers to (default: 4)
   * @returns The modified string with numeric substrings padded to the specified width
   * @example
   * regexify.padNumbers("img2"); // "img0002"
   * regexify("img2").padNumbers().result(); // "img0002"
   * @description
   * This transformation pads numeric substrings in the string to a fixed width.
   * It uses a regex to find all numeric substrings and pads them with leading zeros to the specified width.
   * If no numeric substrings are found, the original string is returned unchanged.
   */
  padNumbers: (str: string, width = 4) =>
    str.replace(/\d+/g, (d) => d.padStart(width, "0")),

  /** Convert to slug (kebab-case) via regex
   * @param str The input string
   * @returns The modified string converted to a slug format (kebab-case)
   * @example
   * regexify.toSlug("Hello World!"); // "hello-world"
   * regexify("Hello World!").toSlug().result(); // "hello-world"
   * @description
   * This transformation converts the string to a slug format (kebab-case).
   * It normalizes the string, removes accents, converts to lowercase, replaces non-alphanumeric characters with hyphens,
   * and trims leading/trailing hyphens. This is useful for creating URL-friendly slugs.
   */
  toSlug: (str: string) =>
    str
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(?:^-+|-+$)/g, ""),

  /** snake_case
   * @param str The input string
   * @returns The modified string converted to snake_case
   * @example
   * regexify.toSnakeCase("Hello World!"); // "hello_world"
   * regexify("Hello World!").toSnakeCase().result(); // "hello_world"
   * @description
   * This transformation converts the string to snake_case.
   * It replaces spaces and non-alphanumeric characters with underscores, converts to lowercase,
   * and removes leading/trailing underscores. This is useful for creating database-friendly identifiers.
   */
  toSnakeCase: (str: string) =>
    str
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/[^A-Za-z0-9]+/g, "_")
      .replace(/_{2,}/g, "_")
      .toLowerCase()
      .replace(/(^_+)|(_+$)/g, ""),

  /** camelCase
   * @param str The input string
   * @returns The modified string converted to camelCase
   * @example
   * regexify.toCamelCase("Hello World!"); // "helloWorld"
   * regexify("Hello World!").toCamelCase().result(); // "helloWorld"
   * @description
   * This transformation converts the string to camelCase.
   * It first converts the string to a slug, then replaces hyphens with uppercase letters,
   * effectively transforming it into camelCase. This is useful for creating JavaScript-friendly identifiers.
   */
  toCamelCase: (str: string) =>
    transformations
      .toSlug(str)
      .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()),

  /** PascalCase
   * @param str The input string
   * @returns The modified string converted to PascalCase
   * @example
   * regexify.toPascalCase("Hello World!"); // "HelloWorld"
   * regexify("Hello World!").toPascalCase().result(); // "HelloWorld"
   * @description
   * This transformation converts the string to PascalCase.
   * It leverages the toCamelCase transformation and capitalizes the first letter.
   * This is useful for creating class or component names that follow the PascalCase convention.
   */
  toPascalCase: (str: string) => {
    const camel = transformations.toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  },

  /**
   * Custom transformation: custom
   * Applies a user-provided regex and replacement.
   * @param input The input string
   * @param pattern The regex pattern to apply
   * @param replacement The replacement string or function
   * @example
   * regexify.custom("Hello123", /\d+/g, ""); // "Hello"
   * regexify("Hello123").custom(/\d+/g, "").result(); // "Hello"
   */
  custom: (
    input: string,
    pattern: RegExp,
    replacement: string | ((substring: string, ...args: any[]) => string)
  ): string => {
    if (typeof replacement === "string") {
      return input.replace(pattern, replacement);
    }
    return input.replace(
      pattern,
      replacement as (substring: string, ...args: any[]) => string
    );
  },
};

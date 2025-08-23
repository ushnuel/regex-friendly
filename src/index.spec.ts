import regexify from "./index";
import { describe, it, expect } from "vitest";

describe("regexify chainable API", () => {
  it("should perform a single transformation", () => {
    const result = regexify("hello   world").noSpace().result();
    expect(result).toBe("helloworld");
  });

  it("should chain multiple transformations", () => {
    const result = regexify("  123 abc  ")
      .collapseSpaces()
      .onlyNumbers()
      .result();
    expect(result).toBe("123");
  });

  it("should return the original input if no transformations are applied", () => {
    const result = regexify("hello world").result();
    expect(result).toBe("hello world");
  });

  it("should perform a validation after a transformation", () => {
    const isValid = regexify("  test@example.com  ").collapseSpaces().isEmail();
    expect(isValid).toBe(true);
  });

  it("should handle no input", () => {
    const result = regexify().result();
    expect(result).toBe("");
  });
});

describe("advanced functions", () => {
  it("should create a lookahead regex", () => {
    const result = regexify.lookahead("abc");
    expect(result).toBe("(?=abc)");
  });

  it("should create a negative lookahead regex", () => {
    const result = regexify.negativeLookahead("abc");
    expect(result).toBe("(?!abc)");
  });

  it("should create a named capturing group", () => {
    const result = regexify.namedGroup("name", "pattern");
    expect(result).toBe("(?<name>pattern)");
  });

  it("should create a non-capturing group", () => {
    const result = regexify.nonCapturing("pattern");
    expect(result).toBe("(?:pattern)");
  });

  it("should create an 'or' pattern", () => {
    const result = regexify.or("a", "b", "c");
    expect(result).toBe("(?:a|b|c)");
  });
});

describe("isCreditCard validation", () => {
  it("should return true for a valid Visa card", () => {
    const isValid = regexify("4111111111111111").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid Mastercard", () => {
    const isValid = regexify("5555555555554444").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid American Express card", () => {
    const isValid = regexify("378282246310005").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid Discover card", () => {
    const isValid = regexify("6011111111111117").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid JCB card", () => {
    const isValid = regexify("3530111333300000").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid Diners Club card", () => {
    const isValid = regexify("30569309025904").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid Verve card", () => {
    const isValid = regexify("6500020000000000009").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid card with spaces", () => {
    const isValid = regexify("4111 1111 1111 1111").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid card with dashes", () => {
    const isValid = regexify("4111-1111-1111-1111").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid card with mixed formats", () => {
    const isValid = regexify("4111 1111-1111 1111").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return true for a valid card with leading/trailing spaces", () => {
    const isValid = regexify("   4111111111111111   ").isCreditCard();
    expect(isValid).toBe(true);
  });

  it("should return false for an empty string", () => {
    const isValid = regexify("").isCreditCard();
    expect(isValid).toBe(false);
  });

  it("should return false for an invalid card number", () => {
    const isValid = regexify("1234567890123456").isCreditCard();
    expect(isValid).toBe(false);
  });

  it("should return false for a card with incorrect length", () => {
    const isValid = regexify("411111111111").isCreditCard();
    expect(isValid).toBe(false);
  });

  it("should return false for a card with non-digit characters", () => {
    const isValid = regexify("411111111111111a").isCreditCard();
    expect(isValid).toBe(false);
  });
});

describe("Transformations", () => {
  it("should remove all whitespace", () => {
    const result = regexify.noSpace("  hello   world  ");
    expect(result).toBe("helloworld");
  });

  it("should collapse spaces", () => {
    const result = regexify.collapseSpaces("  hello   world  ");
    expect(result).toBe("hello world");
  });

  it("should trim", () => {
    const result = regexify.trim("  hello world  ");
    expect(result).toBe("hello world");
  });

  it("should trim left", () => {
    const result = regexify.trimLeft("  hello world  ");
    expect(result).toBe("hello world  ");
  });

  it("should trim right", () => {
    const result = regexify.trimRight("  hello world  ");
    expect(result).toBe("  hello world");
  });

  it("should keep only numbers", () => {
    const result = regexify.onlyNumbers("abc123xyz");
    expect(result).toBe("123");
  });

  it("should return empty string when no digits are present", () => {
    const result = regexify.onlyNumbers("abcdef");
    expect(result).toBe("");
  });

  it("should remove numbers", () => {
    const result = regexify.removeNumbers("abc123xyz");
    expect(result).toBe("abcxyz");
  });

  it("should keep only letters", () => {
    const result = regexify.onlyLetters("abc123XYZ!@#");
    expect(result).toBe("abcXYZ");
  });

  it("should remove letters", () => {
    const result = regexify.removeLetters("abc123XYZ!@#");
    expect(result).toBe("123!@#");
  });

  it("should keep only alphanumerics", () => {
    const result = regexify.onlyAlphanumerics("abc123!@#");
    expect(result).toBe("abc123");
  });

  it("should remove non-alphanumerics", () => {
    const result = regexify.removeNonAlphanumerics("abc123!@#");
    expect(result).toBe("!@#");
  });

  it("should remove special characters", () => {
    const result = regexify.noSpecialChars("abc123!@#");
    expect(result).toBe("abc123");
  });

  it("should replace all occurrences of a pattern", () => {
    const result = regexify.replaceAll("abc abc", "abc", "xyz");
    expect(result).toBe("xyz xyz");
  });

  it("should replace first occurrence of a pattern", () => {
    const result = regexify.replaceFirst("abc abc", "abc", "xyz");
    expect(result).toBe("xyz abc");
  });

  it("should replace last occurrence of a pattern", () => {
    const result = regexify.replaceLast("abc abc", "abc", "xyz");
    expect(result).toBe("abc xyz");
  });

  it("should extract first match for a pattern", () => {
    const result = regexify.extractFirst("abc123xyz456", /\d+/);
    expect(result).toBe("123");
  });

  it("should extract all matches for a pattern", () => {
    const result = regexify.extractAll("abc123xyz456", /\d+/g);
    expect(result).toEqual(["123", "456"]);
  });

  it("should extract named groups from first match", () => {
    const result = regexify.extractGroups("abc", /(?<group>a)/);
    expect(result).toEqual({ group: "a" });
  });

  it("should split by a regex", () => {
    const result = regexify.splitBy("one,two,three", ",");
    expect(result).toEqual(["one", "two", "three"]);
  });

  it("should get text between the first pair of delimiters", () => {
    const result = regexify.between("start middle end", "start", "end");
    expect(result).toBe(" middle ");
  });

  it("should get all texts between delimiters", () => {
    const result = regexify.betweenAll(
      "<a>one</a><b>two</b>",
      /<\w+>/,
      /<\/\w+>/
    );
    expect(result).toEqual(["one", "two"]);
  });

  it("should remove HTML tags", () => {
    const result = regexify.stripHtml("<p>Hello</p>");
    expect(result).toBe("Hello");
  });

  it("should squeeze consecutive spaces into one", () => {
    const result = regexify.squeezeSpaces("a   b");
    expect(result).toBe("a b");
  });

  it("should mask everything except the last N chars", () => {
    const result = regexify.maskTail("SensitiveData", 4);
    expect(result).toBe("*********Data");
  });

  it("should redact matches of a pattern", () => {
    const result = regexify.redact("Sensitive data here", /\bdata\b/);
    expect(result).toBe("Sensitive [REDACTED] here");
  });

  it("should pad numeric substrings to a fixed width", () => {
    const result = regexify.padNumbers("img2", 4);
    expect(result).toBe("img0002");
  });

  it("should convert to slug (kebab-case)", () => {
    const result = regexify.toSlug("Hello World!");
    expect(result).toBe("hello-world");
  });

  it("should convert to snake_case", () => {
    const result = regexify.toSnakeCase("Hello World!");
    expect(result).toBe("hello_world");
  });

  it("should convert to camelCase", () => {
    const result = regexify.toCamelCase("Hello World!");
    expect(result).toBe("helloWorld");
  });

  it("should apply a custom transformation", () => {
    const result = regexify.custom("Hello123", /\d+/g, "");
    expect(result).toBe("Hello");
  });
});

describe("Validations", () => {
  it("should validate email", () => {
    expect(regexify.isEmail("test@example.com")).toBe(true);
    expect(regexify.isEmail("invalid-email")).toBe(false);
  });

  it("should validate URL", () => {
    expect(regexify.isUrl("https://example.com")).toBe(true);
    expect(regexify.isUrl("http://example.com/path?query=123")).toBe(true);
    expect(regexify.isUrl("ftp://example.com")).toBe(false);
    expect(regexify.isUrl("invalid-url")).toBe(false);
  });

  it("should validate HTML tag", () => {
    expect(regexify.isHtmlTag("<div>")).toBe(true);
    expect(regexify.isHtmlTag("invalid-tag")).toBe(false);
  });

  it("should validate phone number", () => {
    expect(regexify.isPhone("123-456-7890")).toBe(true);
    expect(regexify.isPhone("not a phone")).toBe(false);
  });

  it("should validate postal code", () => {
    expect(regexify.isPostalCode("12345")).toBe(true);
    expect(regexify.isPostalCode("12345-6789")).toBe(true);
    expect(regexify.isPostalCode("invalid postal")).toBe(false);
  });

  it("should validate hex color code", () => {
    expect(regexify.isHexColor("#ff5733")).toBe(true);
    expect(regexify.isHexColor("#123")).toBe(true);
    expect(regexify.isHexColor("invalid-color")).toBe(false);
  });

  it("should validate IPv4 address", () => {
    expect(regexify.isIPv4("172.16.0.1")).toBe(true);
    expect(regexify.isIPv4("256.256.256.256")).toBe(false);
  });

  it("should validate IPv6 address", () => {
    expect(regexify.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(
      true
    );
    expect(regexify.isIPv6("invalid-ipv6")).toBe(false);
  });

  it("should validate UUID v4", () => {
    expect(regexify.isUUIDv4("123e4567-e89b-12d3-a456-426614174000")).toBe(
      false
    );
    expect(regexify.isUUIDv4("123e4567-e89b-42d3-a456-426614174000")).toBe(
      true
    );
    expect(regexify.isUUIDv4("invalid-uuid")).toBe(false);
  });

  it("should validate alphanumeric string", () => {
    expect(regexify.isAlphanumeric("abc123")).toBe(true);
    expect(regexify.isAlphanumeric("abc 123")).toBe(false);
  });

  it("should validate username", () => {
    expect(regexify.isUsername("user123")).toBe(true);
    expect(regexify.isUsername("user name")).toBe(false);
  });

  it("should validate slug", () => {
    expect(regexify.isSlug("my-awesome-slug")).toBe(true);
    expect(regexify.isSlug("My Awesome Slug")).toBe(false);
  });

  it("should validate date in ISO format", () => {
    expect(regexify.isDateISO("2023-10-01")).toBe(true);
    expect(regexify.isDateISO("01-10-2023")).toBe(false);
  });

  it("should validate time in 24-hour format", () => {
    expect(regexify.isTime24h("14:30")).toBe(true);
    expect(regexify.isTime24h("25:00")).toBe(false);
  });

  it("should validate date and time in ISO format", () => {
    expect(regexify.isDateTimeISO("2023-10-01T14:30:00Z")).toBe(true);
    expect(regexify.isDateTimeISO("2023-10-01 14:30:00")).toBe(false);
  });

  it("should validate JSON", () => {
    expect(regexify.isJson('{"key": "value"}')).toBe(true);
    expect(regexify.isJson('{"key": value}')).toBe(false);
  });

  it("should validate base64 encoded string", () => {
    expect(regexify.isBase64("SGVsbG8gV29ybGQ=")).toBe(true);
    expect(regexify.isBase64("Invalid Base64")).toBe(false);
  });

  it("should check for uppercase letters", () => {
    expect(regexify.hasUppercase("Hello World")).toBe(true);
    expect(regexify.hasUppercase("hello world")).toBe(false);
  });

  it("should check for lowercase letters", () => {
    expect(regexify.hasLowercase("Hello World")).toBe(true);
    expect(regexify.hasLowercase("HELLO WORLD")).toBe(false);
  });

  it("should check for digits", () => {
    expect(regexify.hasDigit("Hello123")).toBe(true);
    expect(regexify.hasDigit("Hello World")).toBe(false);
  });

  it("should check for special characters", () => {
    expect(regexify.hasSymbol("Hello@World")).toBe(true);
    expect(regexify.hasSymbol("Hello World")).toBe(false);
  });

  it("should validate strong password", () => {
    expect(regexify.isStrongPassword("StrongP@ssw0rd")).toBe(true);
    expect(regexify.isStrongPassword("weakpassword")).toBe(false);
  });

  it("should check if string contains a specific word", () => {
    expect(regexify.hasWordBoundary("Hello World", "World")).toBe(true);
    expect(regexify.hasWordBoundary("Hello World", "Universe")).toBe(false);
  });
});

describe("Advanced", () => {
  it("should create a positive lookahead", () => {
    const result = regexify.lookahead("abc");
    expect(result).toBe("(?=abc)");
  });

  it("should create a negative lookahead", () => {
    const result = regexify.negativeLookahead("abc");
    expect(result).toBe("(?!abc)");
  });

  it("should create a positive lookbehind", () => {
    const result = regexify.lookbehind("abc");
    expect(result).toBe("(?<=abc)");
  });

  it("should create a negative lookbehind", () => {
    const result = regexify.negativeLookbehind("abc");
    expect(result).toBe("(?<!abc)");
  });

  it("should create a non-capturing group", () => {
    const result = regexify.nonCapturing("abc");
    expect(result).toBe("(?:abc)");
  });

  it("should create a named capturing group", () => {
    const result = regexify.namedGroup("name", "pattern");
    expect(result).toBe("(?<name>pattern)");
  });

  it("should create an or pattern", () => {
    const result = regexify.or("a", "b", "c");
    expect(result).toBe("(?:a|b|c)");
  });

  it("should create a character class of any of the given characters", () => {
    const result = regexify.anyOf("abc");
    expect(result).toBe("[abc]");
  });

  it("should create a character class of none of the given characters", () => {
    const result = regexify.noneOf("abc");
    expect(result).toBe("[^abc]");
  });

  it("should repeat a pattern n times", () => {
    const result = regexify.repeat("a", 3);
    expect(result).toBe("(?:a){3}");
  });

  it("should repeat a pattern min to max times", () => {
    const result = regexify.repeat("a", 2, 4);
    expect(result).toBe("(?:a){2,4}");
  });

  it("should create an optional pattern", () => {
    const result = regexify.optional("a");
    expect(result).toBe("(?:a)?");
  });

  it("should create a one or more pattern", () => {
    const result = regexify.oneOrMore("a");
    expect(result).toBe("(?:a)+");
  });

  it("should create a zero or more pattern", () => {
    const result = regexify.zeroOrMore("a");
    expect(result).toBe("(?:a)*");
  });

  it("should create a starts with pattern", () => {
    const result = regexify.startsWith("a");
    expect(result).toEqual(/^a/);
  });

  it("should create an ends with pattern", () => {
    const result = regexify.endsWith("a");
    expect(result).toEqual(/a$/);
  });

  it("should create a word pattern", () => {
    const result = regexify.word("a");
    expect(result).toEqual(/\b(?:a)\b/g);
  });

  it("should create a not word boundary pattern", () => {
    const result = regexify.notWordBoundary();
    expect(result).toEqual(/\B/g);
  });

  it("should build a RegExp with flags", () => {
    const result = regexify.build("a", "i");
    expect(result).toEqual(/a/i);
  });
});

describe("rexFunctions", () => {
  it("should format a credit card number", () => {
    const result = regexify.formatCardNumber("4532015112830366");
    expect(result).toBe("4532 0151 1283 0366");
  });

  it("should validate a credit card number", () => {
    const result = regexify.validateCreditCard("4111111111111111");
    expect(result.isValid).toBe(true);
    expect(result.cardType).toBe("Visa");
    expect(result.errors).toEqual([]);
  });

  it("should return errors for an invalid credit card number", () => {
    const result = regexify.validateCreditCard("1234567890123456");
    expect(result.isValid).toBe(false);
    expect(result.cardType).toBe("Unknown");
    expect(result.errors).toContain("Invalid card number (failed Luhn check)");
  });

  it("should return errors for a short credit card number", () => {
    const result = regexify.validateCreditCard("123");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Invalid length: must be 13-19 digits");
  });

  it("should return errors for a credit card with non-digit characters", () => {
    const result = regexify.validateCreditCard("4111-1111-1111-1111n");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Must contain only digits");
  });
});

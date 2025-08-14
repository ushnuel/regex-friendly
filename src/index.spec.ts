import regexify from "./index";
import { describe, it, expect } from "vitest";

describe("regexify chainable API", () => {
  it("should perform a single transformation", () => {
    const result = regexify("hello   world").collapseSpaces().result();
    expect(result).toBe("hello world");
  });

  it("should chain multiple transformations", () => {
    const result = regexify("  123 abc  ")
      .collapseSpaces()
      .onlyNumbers()
      .result();
    expect(result).toBe("123");
  });

  it("should perform a validation", () => {
    const isValid = regexify("test@example.com").isEmail();
    expect(isValid).toBe(true);
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

describe("regexify static API", () => {
  it("should use static transformation", () => {
    const result = regexify.collapseSpaces("hello   world");
    expect(result).toBe("hello world");
  });

  it("should use static validation", () => {
    const isValid = regexify.isEmail("test@example.com");
    expect(isValid).toBe(true);
  });
});

describe("advanced functions", () => {
  it("should create a lookahead regex", () => {
    const result = regexify.lookahead("abc");
    expect(result).toBe("(?=abc)");
  });

  it("should match groups", () => {
    const result = regexify.matchGroups("abc", /(?<group>a)/);
    expect(result).toEqual({ group: "a" });
  });
});

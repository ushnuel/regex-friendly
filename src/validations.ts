import { validateCreditCard } from "./utils";

/** Validation helpers returning boolean */
export const validations = {
  /** Checks if string is a valid email
   * @param str - Email string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isEmail("eze@gmail.com");
   * // true
   * * isEmail("invalid-email");
   * // false
   * ```
   * This regex checks for a valid email format with local part and domain.
   */
  isEmail: (str: string) =>
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(str),

  /** Checks if string is a valid URL
   * @param str - URL string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isUrl("https://example.com");
   * // true
   * isUrl("ftp://example.com");
   * // false
   * isUrl("http://example.com/path?query=123");
   * // true
   * isUrl("invalid-url");
   * // false
   * ```
   * This regex checks for a valid URL format starting with http or https.
   */
  isUrl: (str: string) => /^https?:\/\/[^\s]+$/i.test(str),

  /** Checks if string is a valid HTML tag
   * @param str - HTML tag string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isHtmlTag("<div>");
   * // true
   * isHtmlTag("invalid-tag");
   * // false
   * ```
   * This regex checks for a valid HTML tag format.
   */
  isHtmlTag: (str: string) => /<[^>]+>/g.test(str),

  /** Checks if string is a valid phone number
   * @param str - Phone number string to validate
   * @returns true if valid, false otherwise
   *
   * This regex allows optional leading +, digits, spaces, parentheses, and hyphens.
   * Adjust regex for stricter validation if needed.
   */
  isPhone: (str: string) => /^\+?[0-9\s().-]{7,20}$/.test(str),

  /** Checks if string is a valid postal code
   * @param str - Postal code string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isPostalCode("12345");
   * // true
   * isPostalCode("123-456");
   * // true
   * isPostalCode("invalid postal");
   * // false
   *
   * This regex allows alphanumeric characters, spaces, and hyphens.
   */
  isPostalCode: (str: string) => /^[A-Za-z0-9\s-]{3,10}$/.test(str),

  /** Checks if string is a valid credit card number (simplified to length check)
   * @param creditCard - Credit card number string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isCreditCard("4111111111111111");
   * // true
   * isCreditCard("1234567890123456");
   * // false
   *
   * This regex checks for common credit card formats.
   */
  isCreditCard: (creditCard: string): boolean => {
    return validateCreditCard(creditCard).isValid;
  },

  /** Checks if string is a valid hex color code
   * @param str - Hex color code string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isHexColor("#ff5733");
   * // true
   * isHexColor("#123");
   * // true
   * isHexColor("invalid-color");
   * // false
   *
   * This regex checks for 3 or 6 digit hex color codes with optional leading #.
   */
  isHexColor: (str: string) => /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(str),

  /** Checks if string is a valid IPv4 address
   * @param str - IPv4 address string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isIPv4("invalid-ipv4");
   * // false
   * isIPv4("172.16.0.1");
   * // true
   * isIPv4("256.256.256.256");
   * // false
   *
   * This regex checks for standard IPv4 format with 4 octets (0-255).
   */
  isIPv4: (str: string) => {
    const parts = str.split(".");
    return (
      parts.length === 4 &&
      parts.every((part) => {
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255 && /^\d+$/.test(part);
      })
    );
  },
  /** Checks if string is a valid IPv6 address
   * @param str - IPv6 address string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
   * // true
   * isIPv6("invalid-ipv6");
   * // false
   *
   * This regex checks for standard IPv6 format with 8 groups of 1-4 hex digits.
   */
  isIPv6: (str: string) =>
    /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/.test(str),

  /** Checks if string is a valid UUID v4
   * @param str - UUID v4 string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isUUIDv4("123e4567-e89b-42d3-a456-426614174000");
   * // true
   * isUUIDv4("123e4567-e89b-12d3-a456-426614174000");
   * // false
   * isUUIDv4("invalid-uuid");
   * // false
   *
   * This regex checks for standard UUID v4 format with 8-4-4-4-12 hex digits.
   */

  isUUIDv4: (str: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      str
    ),

  /** Checks if string is alphanumeric (letters and digits only)
   * @param str - String to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isAlphanumeric("abc123");
   * // true
   * isAlphanumeric("abc 123");
   * // false
   *
   * This regex checks for letters and digits only, no spaces or symbols.
   */
  isAlphanumeric: (str: string) => /^[A-Za-z0-9]+$/.test(str),
  /** Checks if string is a valid username
   * @param str - Username string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isUsername("user123");
   * // true
   * isUsername("user name");
   * // false
   *
   * This regex checks for usernames with 3-32 characters, allowing letters, digits, and underscores.
   */
  isUsername: (str: string) => /^\w{3,32}$/.test(str),
  /** Checks if string is a valid slug
   * @param str - Slug string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isSlug("my-awesome-slug");
   * // true
   * isSlug("My Awesome Slug");
   * // false
   *
   * This regex checks for slugs with lowercase letters, digits, and hyphens.
   */
  isSlug: (str: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str),

  /** Checks if string is a valid date in ISO format (YYYY-MM-DD)
   * @param str - Date string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isDateISO("2023-10-01");
   * // true
   * isDateISO("01-10-2023");
   * // false
   *
   * This regex checks for dates in the format YYYY-MM-DD.
   */
  isDateISO: (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str),
  /** Checks if string is a valid time in 24-hour format (HH:MM or HH:MM:SS)
   * @param str - Time string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isTime24h("14:30");
   * // true
   * isTime24h("25:00");
   * // false
   *
   * This regex checks for times in the format HH:MM or HH:MM:SS, allowing 00-23 for hours and 00-59 for minutes/seconds.
   */
  isTime24h: (str: string) =>
    /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(str),
  /** Checks if string is a valid date and time in ISO format (YYYY-MM-DDTHH:MM:SSZ)
   * @param str - DateTime string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isDateTimeISO("2023-10-01T14:30:00Z");
   * // true
   * isDateTimeISO("2023-10-01 14:30:00");
   * // false
   *
   * This regex checks for date and time in ISO format with optional timezone offset.
   */
  isDateTimeISO: (str: string) =>
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(str),
  /** Checks if string is a valid JSON
   * @param str - JSON string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isJson('{"key": "value"}');
   * // true
   * isJson('{"key": value}');
   * // false
   *
   * This function attempts to parse the string as JSON and returns true if successful.
   */
  isJson: (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  },

  /** Checks if string is a valid base64 encoded string
   * @param str - Base64 string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isBase64("SGVsbG8gV29ybGQ=");
   * // true
   * isBase64("Invalid Base64");
   * // false
   *
   * This function checks if the string can be encoded and decoded as base64.
   */
  isBase64: (str: string) => {
    try {
      return btoa(atob(str)) === str;
    } catch {
      return false;
    }
  },
  /** Checks if string contains uppercase letters
   * @param str - String to check
   * @returns true if contains uppercase letters, false otherwise
   * @example
   * ```typescript
   * hasUppercase("Hello World");
   * // true
   * hasUppercase("hello world");
   * // false
   *
   * This regex checks for at least one uppercase letter in the string.
   */
  hasUppercase: (str: string) => /[A-Z]/.test(str),
  /** Checks if string contains lowercase letters
   * @param str - String to check
   * @returns true if contains lowercase letters, false otherwise
   * @example
   * ```typescript
   * hasLowercase("Hello World");
   * // true
   * hasLowercase("HELLO WORLD");
   * // false
   *
   * This regex checks for at least one lowercase letter in the string.
   */
  hasLowercase: (str: string) => /[a-z]/.test(str),
  /** Checks if string contains digits
   * @param str - String to check
   * @returns true if contains digits, false otherwise
   * @example
   * ```typescript
   * hasDigit("Hello123");
   * // true
   * hasDigit("Hello World");
   * // false
   *
   * This regex checks for at least one digit in the string.
   */
  hasDigit: (str: string) => /\d/.test(str),
  /** Checks if string contains special characters
   * @param str - String to check
   * @returns true if contains special characters, false otherwise
   * @example
   * ```typescript
   * hasSymbol("Hello@World");
   * // true
   * hasSymbol("Hello World");
   * // false
   *
   * This regex checks for at least one character that is not a letter, digit, or space.
   */
  hasSymbol: (str: string) => /[^A-Za-z0-9\s]/.test(str),
  /** Checks if string is a strong password
   * @param str - Password string to validate
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * isStrongPassword("StrongP@ssw0rd");
   * // true
   * isStrongPassword("weakpassword");
   * // false
   *
   * This regex checks for at least 8 characters with at least one lowercase, one uppercase, one digit, and one special character.
   */
  isStrongPassword: (str: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(str),
  /** Checks if string contains a specific word
   * @param str - String to check
   * @param word - Word to search for
   * @returns true if contains the word, false otherwise
   * @example
   * ```typescript
   * hasWord("Hello World", "World");
   * // true
   * hasWord("Hello World", "Universe");
   * // false
   *
   * This regex checks for the exact word with word boundaries.
   */
  hasWordBoundary: (str: string, word: string) =>
    new RegExp(`\\b${word}\\b`).test(str),
};

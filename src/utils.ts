/**
 * Credit card types with their validation patterns
 */
const CARD_TYPES = {
  visa: {
    name: "Visa",
    pattern: /^4\d{12}(?:\d{3})?$/,
    lengths: [13, 16, 19],
  },
  verve: {
    name: "Verve",
    pattern: /^(506(099|1\d{2})|650\d{3})\d{10,13}$/,
    lengths: [16, 18, 19],
  },
  mastercard: {
    name: "Mastercard",
    pattern: /^(?:5[1-5]\d{14}|2[2-7]\d{14})$/,
    lengths: [16],
  },
  amex: {
    name: "American Express",
    pattern: /^3[47]\d{13}$/,
    lengths: [15],
  },
  discover: {
    name: "Discover",
    pattern: /^6(?:011|5\d{2})\d{12}$/,
    lengths: [16],
  },
  dinersclub: {
    name: "Diners Club",
    pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/,
    lengths: [14],
  },
  jcb: {
    name: "JCB",
    pattern: /^(?:2131|1800|35\d{3})\d{11}$/,
    lengths: [16],
  },
};

/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber - Credit card number as string
 * @returns true if valid according to Luhn algorithm
 */
function validateLuhn(cardNumber: string): boolean {
  // Remove only spaces and hyphens, keep other characters to detect invalid input
  const digits = cardNumber.replace(/[\s-]/g, "");

  // Check if contains only digits
  if (!/^\d+$/.test(digits)) {
    return false;
  }

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Process digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Identifies the credit card type based on the card number
 * @param cardNumber - Credit card number as string
 * @returns card type name or 'unknown'
 */
export function identifyCardType(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/[\s-]/g, "");

  // Return unknown if contains non-digits
  if (!/^\d+$/.test(cleanNumber)) {
    return "Unknown";
  }

  // Check against each card type
  for (const [_, card] of Object.entries(CARD_TYPES)) {
    if (card.pattern.test(cleanNumber)) {
      return card.name;
    }
  }

  return "Unknown";
}

/**
 * Comprehensive credit card validation
 * @param cardNumber - Credit card number as string
 * @returns validation result object
 */
export interface ValidationResult {
  isValid: boolean;
  cardType: string;
  errors: string[];
}

export function validateCreditCard(cardNumber: string): ValidationResult {
  const errors: string[] = [];

  // Check for invalid characters (allow only digits, spaces, and hyphens)
  if (!/^[\d\s-]+$/.test(cardNumber)) {
    errors.push(
      "Contains invalid characters (only digits, spaces, and hyphens allowed)"
    );
  }

  const cleanNumber = cardNumber.replace(/[\s-]/g, "");

  // Basic format check
  if (!cleanNumber || cleanNumber.length < 13 || cleanNumber.length > 19) {
    errors.push("Invalid length: must be 13-19 digits");
  }

  if (!/^\d+$/.test(cleanNumber)) {
    errors.push("Must contain only digits");
  }

  // Luhn algorithm validation
  const luhnValid = validateLuhn(cardNumber);
  if (!luhnValid) {
    errors.push("Invalid card number (failed Luhn check)");
  }

  // Identify card type
  const cardType = identifyCardType(cardNumber);

  // Check if length matches card type
  if (cardType !== "Unknown") {
    const typeConfig = Object.values(CARD_TYPES).find(
      (c) => c.name === cardType
    );
    if (typeConfig && !typeConfig.lengths.includes(cleanNumber.length)) {
      errors.push(`Invalid length for ${cardType}`);
    }
  }

  return {
    isValid: errors.length === 0,
    cardType,
    errors,
  };
}

/**
 * Formats a credit card number with spaces for display
 * @param cardNumber - Credit card number as string
 * @returns formatted card number
 */
export function formatCardNumber(cardNumber: string): string {
  const cleanNumber = cardNumber.replace(/\D/g, "");
  const cardType = identifyCardType(cleanNumber);

  // Different formatting for different card types
  if (cardType === "American Express") {
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  } else if (cardType === "Diners Club") {
    return cleanNumber.replace(/(\d{4})(\d{6})(\d{4})/, "$1 $2 $3");
  } else {
    // Default 4-digit grouping for Visa, Mastercard, etc.
    return cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  }
}

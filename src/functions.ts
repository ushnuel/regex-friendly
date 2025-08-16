/** Regex function helpers */

import { identifyCardType, validateCreditCard } from "./utils";

export const rexFunctions = {
  /**
   * Formats a credit card number with spaces for display
   * @param cardNumber - Credit card number as string
   * @returns formatted card number
   * @example
   * formatCardNumber("4532015112830366"); // "4532 0151 1283 0366"
   */
  formatCardNumber: (cardNumber: string): string => {
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
  },

  /**
   * Validates a credit card number and returns detailed results
   * @param cardNumber - Credit card number as string
   * @returns validation result object
   * @example
   * validateCreditCard("4111111111111111");
   * // {
   * //   isValid: true,
   * //   cardType: "Visa",
   * //   errors: []
   * // }
   * validateCreditCard("1234567890123456");
   * // {
   * //   isValid: false,
   * //   cardType: "Unknown",
   * //   errors: ["Invalid card number (failed Luhn check)"]
   * // }
   */
  validateCreditCard: (cardNumber: string) => {
    return validateCreditCard(cardNumber);
  },
};

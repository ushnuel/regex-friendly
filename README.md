# regex-friendly

[![npm version](https://img.shields.io/npm/v/regex-friendly.svg)](https://www.npmjs.com/package/regex-friendly)
[![npm downloads](https://img.shields.io/npm/dm/regex-friendly.svg)](https://www.npmjs.com/package/regex-friendly)
[![Build Status](https://img.shields.io/github/actions/workflow/status/ushnuel/regex-friendly/ci.yml?branch=main)](https://github.com/ushnuel/regex-friendly/actions)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Readable, chainable, and type-safe regex helpers for JavaScript & TypeScript.**  
> Stop fighting unreadable regex — write them friendly instead.

---

## ✨ Features

- ✅ **Chainable transformations** (`.noSpace().onlyNumbers()...`)
- ✅ **Static methods** for quick one-offs
- ✅ **Validations** (`isEmail`, `isUUID`, `isPhoneNumber`, etc.)
- ✅ **Functions** (`formatCardNumber`, `validateCreditCard`)
- ✅ **String transformations** (remove spaces, keep only numbers, reverse, custom regex)
- ✅ **30+ built-in common & advanced regex patterns**
- ✅ **Fully typed** with IntelliSense auto-completion
- ✅ Works in **Node.js** and modern browsers

---

## 📦 Installation

```bash
npm install regex-friendly
# or
yarn add regex-friendly
# or
pnpm add regex-friendly
```

---

## 🚀 Usage

### Static methods

```ts
import RegexFriendly from "regex-friendly";
import { transformations, validations } from "regex-friendly";

RegexFriendly.onlyNumbers("a1b2c3");
// "123"
transformations.removeNumbers("abc123xyz");
// "abcxyz"

RegexFriendly.isEmail("test@example.com");
// true
validations.isUrl("https://example.com");
// true
```

### Chainable methods

```ts
RegexFriendly("Hello World 123").noSpace().onlyNumbers().result();
// "123"
```

### Custom transformation

```ts
RegexFriendly.custom("foo bar", /foo/g, "baz");
// "baz bar"
```

Or in a chain:

```ts
RegexFriendly("foo bar baz")
  .custom(/foo/, "hello")
  .custom(/baz/, "world")
  .result();
// "hello bar world"
```

---

## 🧩 Available Helpers

### 🔹 Transformations

- `noSpace()`
- `onlyNumbers()`
- `onlyLetters()`
- `reverseString()`
- `custom(regex, replacement)`
- …and more

### 🔹 Validations

- `isEmail()`
- `isPhoneNumber()`
- `isUUID()`
- `isHexColor()`
- `isIPAddress()`
- …and 20+ others

---

## 📜 License

MIT © [Emmanuel Eze](https://github.com/ushnuel)

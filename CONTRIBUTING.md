# Contributing to Regex Friendly

Thanks for your interest in contributing! 🎉  
This project aims to make regex more **readable, chainable, and type-safe**. To keep it reliable, consistent, and welcoming to new contributors, please follow the guidelines below.

---

## 🚀 Getting Started

1. Fork the repository and clone it locally:

   ```bash
   git clone https://github.com/ushnuel/regex-friendly.git
   ```

2. Navigate into the project:

   ```bash
   cd regex-friendly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the build:

   ```bash
   npm run build
   ```

5. Verify everything works:

   ```bash
   npm test
   ```

---

## 📝 Contribution Rules

Before submitting a Pull Request (PR), **all items below must be followed**:

### 1. Code Style

- Use **TypeScript**.
- Keep the code **strictly typed** — avoid `any` unless unavoidable.
- Follow the existing function/chainable pattern for transformations and validations.

### 2. Tests

- Every new feature or bug fix must include **unit tests**.
- Run tests locally:

  ```bash
  npm test
  ```

### 3. Commits

- Use **Conventional Commits**:
  - `feat:` → for new features
  - `fix:` → for bug fixes
  - `docs:` → for documentation changes
  - `chore:` → for tooling or maintenance

- Example:

  ```
  feat(transform): add onlyLetters transformation
  fix(validation): correct isEmail regex
  ```

### 5. Pull Requests

- Keep PRs **focused** (one feature or fix per PR).
- Link the PR to an **existing issue** if possible.
- Write a clear PR description of what the change does.
- Ensure all GitHub Actions / CI checks pass before requesting review.

---

## ✅ PR Checklist

Please confirm the following before submitting a PR:

- [ ] All tests pass (`npm test`)
- [ ] New/updated tests are added
- [ ] Commit message follows Conventional Commits
- [ ] PR description is clear and references related issues (if any)

---

## 💡 Tips

- Run the full pre-publish pipeline locally:

  ```bash
  npm run prepublishOnly
  ```

  This ensures build + test all succeed.

- For large features, discuss in an **issue** before coding to avoid wasted effort.

---

## 🤝 Code of Conduct

Please follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
We want a welcoming and respectful community.

---

Thanks again for contributing to Regex Friendly 💜
Together we can make regex readable for everyone!

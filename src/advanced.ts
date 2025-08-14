export const advanced = {
  lookahead: (pattern: string) => `(?=${pattern})`,
  negativeLookahead: (pattern: string) => `(?!${pattern})`,
  lookbehind: (pattern: string) => `(?<=${pattern})`,
  negativeLookbehind: (pattern: string) => `(?<!${pattern})`,
  matchGroups: (str: string, regex: RegExp) => {
    const match = RegExp(regex).exec(str);
    return match?.groups || {};
  },
  startsWith: (pattern: string) => new RegExp(`^${pattern}`),
  endsWith: (pattern: string) => new RegExp(`${pattern}$`),
};

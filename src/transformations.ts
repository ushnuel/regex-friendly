export const transformations = {
  noSpace: (str: string) => str.replace(/\s+/g, ""),
  onlyNumbers: (str: string) => str.replace(/\D+/g, ""),
  onlyLetters: (str: string) => str.replace(/[^a-zA-Z]+/g, ""),
  noSpecialChars: (str: string) => str.replace(/[^a-zA-Z0-9]+/g, ""),
  collapseSpaces: (str: string) => str.replace(/\s+/g, " ").trim(),
  replace: (str: string, pattern: string | RegExp, replacement: string) =>
    str.replace(
      pattern instanceof RegExp ? pattern : new RegExp(pattern, "g"),
      replacement
    ),
  between: (str: string, start: string, end: string) => {
    const regex = new RegExp(`${start}(.*?)${end}`);
    const match = RegExp(regex).exec(str);
    return match ? match[1] : "";
  },
  removeNumbers: (str: string) => str.replace(/d+/g, ""),
  removeLetters: (str: string) => str.replace(/[a-zA-Z]+/g, ""),
};

export const validations = {
  isEmail: (str: string) =>
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(str),
  isUrl: (str: string) => /^https?:\/\/[^\s]+$/i.test(str),
  isPhone: (str: string) => /^\+?\d{7,15}$/.test(str),
  isHexColor: (str: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str),
  isIPv4: (str: string) => /^(\d{1,3}\.){3}\d{1,3}$/.test(str),
  isIPv6: (str: string) => /^[0-9a-f:]+$/i.test(str),
  isAlphanumeric: (str: string) => /^[a-z0-9]+$/i.test(str),
};

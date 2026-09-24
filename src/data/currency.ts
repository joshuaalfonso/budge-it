export const CURRENCIES = {
  USD: {
    code: "USD",
    name: "US Dollar",
    locale: "en-US",
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    locale: "de-DE",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    locale: "en-GB",
  },
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    locale: "ja-JP",
  },
  PHP: {
    code: "PHP",
    name: "Philippine Peso",
    locale: "en-PH",
  },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
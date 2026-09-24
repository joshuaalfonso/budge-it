import { CURRENCIES, type CurrencyCode } from "@/data/currency";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;

  formatCurrency: (amount: number) => string;
};


export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: "PHP",

            setCurrency: (currency) => {
                set({ currency });
            },

            formatCurrency: (amount) => {
                const { currency } = get();
                const config = CURRENCIES[currency];

                return new Intl.NumberFormat(config.locale, {
                    style: "currency",
                    currency: config.code,
                }).format(amount);
            },
        }),
        {
            name: "currency-preference",
        }
    )
);
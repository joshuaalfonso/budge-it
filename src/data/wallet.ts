export type Wallet = {
  id: number;
  name: string;
  type: "cash" | "bank" | "ewallet";
  balance: number;
};

export const wallets: Wallet[] = [
  {
    id: 1,
    name: "GCash",
    type: "ewallet",
    balance: 12450,
  },
  {
    id: 2,
    name: "BDO",
    type: "bank",
    balance: 28670,
  },
  {
    id: 3,
    name: "Cash",
    type: "cash",
    balance: 6000,
  },
];

export const walletType: {label: string, value: string}[] = [
  {
    label: 'Cash',
    value: 'cash'
  },
  {
    label: 'Debit/Savings',
    value: 'savings'
  },
  {
    label: 'Credit Card',
    value: 'credit_card'
  },
  {
    label: 'E-Wallet',
    value: 'e_wallet'
  },
  {
    label: 'Other',
    value: 'other'
  },
]
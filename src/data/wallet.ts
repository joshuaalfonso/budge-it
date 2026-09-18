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
export type Transaction = {
  id: number;
  title: string;
  category: string;
  wallet: string;
  date: string;
  amount: number;
  type: "income" | "expense";
};

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Lunch",
    category: "Food",
    wallet: "GCash",
    date: "2026-09-18",
    amount: 250,
    type: "expense",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Shopping",
    wallet: "BDO",
    date: "2026-09-17",
    amount: 1850,
    type: "expense",
  },
  {
    id: 3,
    title: "Salary",
    category: "Salary",
    wallet: "BDO",
    date: "2026-09-15",
    amount: 30000,
    type: "income",
  },
  {
    id: 4,
    title: "Grab",
    category: "Transportation",
    wallet: "GCash",
    date: "2026-09-14",
    amount: 320,
    type: "expense",
  },
  {
    id: 5,
    title: "Coffee",
    category: "Food",
    wallet: "GCash",
    date: "2026-09-13",
    amount: 180,
    type: "expense",
  },
  {
    id: 6,
    title: "Freelance project",
    category: "Freelance",
    wallet: "BDO",
    date: "2026-09-10",
    amount: 8500,
    type: "income",
  },
];
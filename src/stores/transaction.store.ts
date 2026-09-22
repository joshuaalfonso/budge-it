import type { Transaction } from "@/types/transaction.types";
import { create } from "zustand";

interface TransactionDialogState {
  open: boolean;
  selected: Transaction | null;

  setOpen: (open: boolean) => void;
  setSelected: (item: Transaction | null) => void;
}

export const useTransactionDialogStore = create<TransactionDialogState>((set) => ({
    open: false,
    selected: null,
    setOpen: (open) => set({ open, selected: null }),
    setSelected: (selected) => set({ selected, open: true }),
}));
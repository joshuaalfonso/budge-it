import type { Wallet } from "@/types/wallet.types";
import { create } from "zustand";

// type WalletType = 'cash' | 'e_wallet' | 'credit_card' | 'savings' | 'other';

// interface Wallet {
//     name: string,
//     type: WalletType,
//     initial_balance: string
//     created_at: string
// }

interface WalletDialogState {
  open: boolean;
  selected: Wallet | null;

  setOpen: (open: boolean) => void;
  setSelected: (wallet: Wallet | null) => void;
}


// export const useWalletDialogStore = () =>
//   createStore<WalletDialogState>((set) => ({
//     open: false,
//     selected: null,
//     setOpen: (open) => set({ open }),
//     setSelected: (selected) => set({ selected, open: true }),
//   }));

export const useWalletDialogStore = create<WalletDialogState>((set) => ({
    open: false,
    selected: null,
    setOpen: (open) => set({ open, selected: null }),
    setSelected: (selected) => set({ selected, open: true }),
}));
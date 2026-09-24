import type { Category } from "@/types/category.type";
import { create } from "zustand";


interface CategoryDialogState {
  open: boolean;
  selected: Category | null;

  setOpen: (open: boolean) => void;
  setSelected: (wallet: Category | null) => void;
}


export const useCategoryDialogStore = create<CategoryDialogState>((set) => ({
    open: false,
    selected: null,
    setOpen: (open) => set({ open, selected: null }),
    setSelected: (selected) => set({ selected, open: true }),
}));
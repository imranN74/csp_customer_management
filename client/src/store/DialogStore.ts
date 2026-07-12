import { create } from "zustand";

interface DialogStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));

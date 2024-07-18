import { NetworkType, WalletType } from "@oraichain/oraidex-common";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface MultisigStore {
  listMultisig?: Record<string, string[]>;
}

export interface MultisigAction {
  handleSetListMultisig: ({
    listMultisig,
  }: Pick<MultisigStore, "listMultisig">) => void;
}

const initialState = {
  listMultisig: {},
};

const useMultisigStore = create<MultisigStore & { actions: MultisigAction }>()(
  persist(
    immer((set) => ({
      //States
      ...initialState,

      //Actions
      actions: {
        handleSetListMultisig: ({ listMultisig }) => set({ listMultisig }),
      },
    })),
    {
      name: "Zus:Multisig",
      partialize: ({ listMultisig }) => ({ listMultisig }),
    }
  )
);

export default useMultisigStore;

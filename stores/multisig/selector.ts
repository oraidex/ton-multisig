import useMultisigStore from "./useMultisigStore";

export const useMultisigActions = () =>
  useMultisigStore((state) => state.actions);
export const useGetListMultisig = () =>
  useMultisigStore((state) => state.listMultisig);

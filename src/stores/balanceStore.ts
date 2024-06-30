import { createStore } from 'zustand';

export type BalanceState = {
  balance: number;
};

export type BalanceActions = {
  deductBalance: (amount: number) => void;
  addBalance: (amount: number) => void;
  setBalance: (balance: number) => void;
};

export type BalanceStore = BalanceState & BalanceActions;

export const defaultInitState: BalanceState = {
  balance: 0,
};

export const createBalanceStore = (
  initState: BalanceState = defaultInitState
) => {
  return createStore<BalanceStore>()((set) => ({
    ...initState,
    deductBalance: (amount) =>
      set((state) => ({ balance: state.balance - amount })),
    setBalance: (balance) => set((state) => ({ balance: balance })),
    addBalance: (amount) =>
      set((state) => ({ balance: state.balance + amount })),
  }));
};

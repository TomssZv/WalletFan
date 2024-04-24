import { createStore } from "zustand";
import { transactionApiItem } from "../common/types/global"

export type TransactionState = {
  transactionList: transactionApiItem[]
}

export type TransactionActions = {
  setTransactionList: (list: transactionApiItem[]) => void
  removeTransaction: (id: number) => void
}

export type TransactionStore = TransactionState & TransactionActions

export const defaultInitState: TransactionState = {
  transactionList: [],
}

export const createTransactionStore = (
  initState: TransactionState = defaultInitState,
) => {
  return createStore<TransactionStore>()((set) => ({
    ...initState,
    setTransactionList: (list) => set(() => ({ transactionList: list  })),
    removeTransaction: (id) => set((state) => ({ transactionList: state.transactionList.filter((transaction) => transaction.id !== id) }))
  }))
}
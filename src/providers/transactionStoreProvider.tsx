'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type TransactionStore, createTransactionStore } from '@/stores/TransactionStore'

export const TransactionStoreContext = createContext<StoreApi<TransactionStore> | null>(
  null,
)

export interface TransactionStoreProviderProps {
  children: ReactNode
}

export const TransactionStoreProvider = ({
  children,
}: TransactionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TransactionStore>>()
  if (!storeRef.current) {
    storeRef.current = createTransactionStore()
  }

  return (
    <TransactionStoreContext.Provider value={storeRef.current}>
      {children}
    </TransactionStoreContext.Provider>
  )
}

export const useTransactionStore = <T,>(
  selector: (store: TransactionStore) => T,
): T => {
  const transactionStoreContext = useContext(TransactionStoreContext)

  if (!transactionStoreContext) {
    throw new Error(`useTransactionStore must be use within TransactionStoreProvider`)
  }

  return useStore(transactionStoreContext, selector)
}

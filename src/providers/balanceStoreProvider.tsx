'use client'


import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type BalanceStore, createBalanceStore } from '@/stores/balanceStore'

export const BalanceStoreContext = createContext<StoreApi<BalanceStore> | null>(
  null,
)

export interface BalanceStoreProviderProps {
  children: ReactNode
}

export const BalanceStoreProvider = ({
  children,
}: BalanceStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BalanceStore>>()
  if (!storeRef.current) {
    storeRef.current = createBalanceStore()
  }

  return (
    <BalanceStoreContext.Provider value={storeRef.current}>
      {children}
    </BalanceStoreContext.Provider>
  )
}

export const useBalanceStore = <T,>(
  selector: (store: BalanceStore) => T,
): T => {
  const balanceStoreContext = useContext(BalanceStoreContext)

  if (!balanceStoreContext) {
    throw new Error(`useBalanceStore must be use within BalanceStoreProvider`)
  }

  return useStore(balanceStoreContext, selector)
}

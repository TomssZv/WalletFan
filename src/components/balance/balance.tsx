"use client"

import { useBalanceStore } from "@/providers/balanceStoreProvider"
import { useEffect } from "react"

interface BalanceProps {
  balance: any
}

const Balance: React.FC<BalanceProps> = (props: BalanceProps) => {
  const propsBalance = props.balance

  const { balance, setBalance } = useBalanceStore(
    (state) => state,
  )

  useEffect(() => {
    setBalance(propsBalance);
  }, [propsBalance])

  return (
    <div className="border border-black rounded-lg py-3 px-8">
        {balance}$
    </div>
  )
}

export default Balance;
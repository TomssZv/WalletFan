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
    <div className="text-end">
        {balance}$
    </div>
  )
}

export default Balance;
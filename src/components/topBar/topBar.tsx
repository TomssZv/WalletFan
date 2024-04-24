'use client'

import { BalanceStoreProvider } from "@/providers/balanceStoreProvider";
import Balance from "../balance/balance";
import { useTransactionStore } from "@/providers/transactionStoreProvider";
import { useBalanceStore } from "@/providers/balanceStoreProvider";
import { useEffect } from "react";

const TopBar: React.FC = () => {
  const { transactionList } = useTransactionStore(
    (state) => state
  )

  const { balance, setBalance } = useBalanceStore(
    (state) => state,
  )

  const fetchBalance = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance/get`);

    if (response.status === 500) {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/balance/set`,
        {
          method: "POST"
        }
      )
    }

    let updateBalance = await response.json();

    if (typeof updateBalance === "object") {
      updateBalance = null;
    }

    setBalance(updateBalance)
  }

  useEffect(() => {
    fetchBalance()
  }, [transactionList])

  return (
    <div className="flex justify-end">
      <BalanceStoreProvider>
        {balance === 0 || balance ?
          <Balance
            balance={balance}
          /> :
          <span>Loading...</span>
        }
      </BalanceStoreProvider>
    </div>
  )
}

export default TopBar;
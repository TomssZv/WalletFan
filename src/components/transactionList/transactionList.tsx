'use client'

import { transactionApiItem } from "@/common/types/global";
import { useEffect, useState } from "react";
import TransactionCard from "../transactionCard/TransactionCard";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<[] | transactionApiItem[]>(Array())

  const getTransactionList = async () => {
    const transactionListResponse  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/getList`)

    const transactionData = await transactionListResponse.json();

    setTransactions(transactionData)
  }

  useEffect(() => {
    getTransactionList()
  }, [])

  return (
    <div>
      History
      {transactions && transactions.map((transaction) => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        )
      })}
    </div>
  )
}

export default TransactionList;
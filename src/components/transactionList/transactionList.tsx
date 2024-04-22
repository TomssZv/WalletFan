'use client'

import { transactionApiItem } from "@/common/types/global";
import { useEffect, useState } from "react";
import TransactionCard from "../transactionCard/TransactionCard";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<[] | transactionApiItem[]>(Array())

  const getTransactionList = async () => {
    const transactionListResponse  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/getList`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageLimit: 10,
        descOrder: true
      })
    })

    const transactionData = await transactionListResponse.json();

    setTransactions(transactionData)
  }

  useEffect(() => {
    getTransactionList()
  }, [])

  return (
    <div>
      Latest
      {transactions && transactions.map((transaction) => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        )
      })}
    </div>
  )
}

export default TransactionList;
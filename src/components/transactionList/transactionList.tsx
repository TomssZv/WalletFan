'use client'

import { useEffect } from "react";
import TransactionCard from "../transactionCard/TransactionCard";
import { useTransactionStore } from "@/providers/transactionStoreProvider";

const TransactionList: React.FC = () => {
  const { transactionList, setTransactionList, refech, refechTransactions } = useTransactionStore(
    (state) => state,
  );

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

    if (JSON.stringify(transactionData) !== JSON.stringify(transactionList)) {
      setTransactionList(transactionData)
    }
  }

  useEffect(() => {
    getTransactionList()
  }, [transactionList, refech])

  return (
    <div>
      Latest
      {transactionList && transactionList.map((transaction) => {
        return (
          <TransactionCard key={transaction.id} transaction={transaction} />
        )
      })}
    </div>
  )
}

export default TransactionList;
import { analyticsApiItem } from "@/common/types/api";
import { AnalyticsTab } from "../analyticsTab/analyticsTab";
import { useState } from "react";

interface GroupedTransactionCardsProps {
  transactions: analyticsApiItem[],
  openMonth: Function
}

export const GroupedTransactionCards = (props: GroupedTransactionCardsProps) => {
  const [showMonth, setShowMonth] = useState<string | null>(null)
  const { transactions, openMonth } = props;

  const groupedDate: string[] = [];

  return <div>
    {transactions.map(transaction => {
      const date = `${transaction.createdAt.substring(0, 4)} - ${transaction.month}`
      
      if (groupedDate.includes(date)) {
        return null
      }

      groupedDate.push(date)

      return <div className="rounded p-3 border border-black mb-3 pointer" onClick={() => {setShowMonth(transaction.month === showMonth ? null : transaction.month)}} key={transaction.id}>
        <span>{transaction.month}</span>
        {transactions.map((filteredTransaction) => 
          filteredTransaction.month === transaction.month ?
            <div key={`filtered-${filteredTransaction.id}`} onClick={() => openMonth(filteredTransaction)} className={`rounded p-3 border border-black mb-3 pointer ${showMonth === transaction.month ? '' : 'hidden'}`}>
              <AnalyticsTab data={filteredTransaction} /> 
            </div> :
             null)}
        </div>


    })}
  </div>
}
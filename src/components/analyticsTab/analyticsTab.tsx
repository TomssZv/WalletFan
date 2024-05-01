
import { useEffect, useState } from "react";
import { AnalyticsTabRoutes } from "../../helpers/analyticsTabRoutes/analyticsTabRoutes"
import { analyticsApiItem } from "@/common/types/api";
import TransactionCard from "../transactionCard/TransactionCard";
import { analyticsTabs } from "@/enums/analyticsTabs";
import { transaction } from "@/common/types/global";

interface analyticsTabProps {
  title: string,
}
export const AnalyticsTab: React.FC<analyticsTabProps> = ({ title }) => {
  const [analyticsData, setAnalyticsData] = useState<analyticsApiItem[]>([]);
  const [preciseAnalytics, setPreciseAnalytics] = useState<transaction[]>([])
  const [isInit, setIsInit] = useState(true);

  const routes = AnalyticsTabRoutes(title);

  if (routes.error || !routes.init) {
    return;
  }

  const fetchInitData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + routes.init}`);

    const data = await response.json()

    setAnalyticsData(data)
  }

  const fetchMonth = async (analyticData: analyticsApiItem) => {

    let preciseId;

    if (title !== analyticsTabs.Summary) {
      preciseId = title === analyticsTabs.Category ? analyticData.categoryId : analyticData.groupId;

      if (!preciseId) {
        return
      }
    }
    
    setIsInit(false)

    const url = `${process.env.NEXT_PUBLIC_API_URL + routes.month}/${analyticData.createdAt.substring(0, 4)}/${analyticData.month}${preciseId ? "/"+preciseId : ''}`
    const response = await fetch(url)
    const data = await response.json()

    setPreciseAnalytics(data)
  }

  useEffect(() => {
    setIsInit(true)
    fetchInitData()
  }, [title])

  return (
    <div>
      {isInit ?
        analyticsData.length > 0 ? analyticsData.map((analyticData) => {
          return (
            <div onClick={() => {fetchMonth(analyticData)}} key={analyticData.id} className="rounded p-3 border border-black mb-3 pointer">
              <span>{analyticData.createdAt.substring(0, 4)} - {analyticData.month}</span>
              {analyticData.categoryName && <h2>{analyticData.categoryName}</h2>}
              {analyticData.groupName && <h2>{analyticData.groupName}</h2>}
              <p>Amount: <span className={analyticData.amount.toString().includes("-") ? "text-red-300" : "text-green-300"}>{analyticData.amount}</span></p>
            </div>
          )
        })
        : <div>No data found!</div>
      : 
      preciseAnalytics.length > 0 ? preciseAnalytics.map((transaction) => {
          return (
            <TransactionCard key={transaction.id} transaction={transaction} />
          )
        })
        : <div>Loading...</div>
      }
    </div>
  )
}
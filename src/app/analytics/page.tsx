'use client'

import { AnalyticsTab } from "../../components/analyticsTab/analyticsTab"
import { analyticsTabs } from "@/enums/analyticsTabs"
import { useState, useEffect } from "react"
import { AnalyticsTabRoutes } from "../../helpers/analyticsTabRoutes/analyticsTabRoutes"
import { analyticsApiItem } from "@/common/types/api";
import TransactionCard from "@/components/transactionCard/TransactionCard"
import { transaction } from "@/common/types/global"

const tabs = [
  {
    id: 1,
    title: analyticsTabs.Summary
  },
  {
    id: 2,
    title: analyticsTabs.Category
  },
  {
    id: 3,
    title: analyticsTabs.Group
  }
]

const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<analyticsApiItem[] | transaction[]>([]);

  useEffect(() => {
    if (selectedMonth && analyticsData.length > 0) {
      return
    }

    const route = AnalyticsTabRoutes(selectedTab.title);

    if (!route?.init) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL + route.init}`)
      .then(response => response.json())
      .then(data => setAnalyticsData(data))
      .catch(err => console.error(err))

  }, [selectedTab, selectedMonth])

  const fetchMonth = async (analyticData: analyticsApiItem) => {

    let preciseId;

    if (selectedTab.title !== analyticsTabs.Summary) {
      preciseId = selectedTab.title === analyticsTabs.Category ? analyticData.categoryId : analyticData.groupId;

      if (!preciseId) {
        return
      }
    }
    
    const route = AnalyticsTabRoutes(selectedTab.title)

    if (!route?.init) {
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL + route.month}/${analyticData.createdAt.substring(0, 4)}/${analyticData.month}${preciseId ? "/" + preciseId : ''}`
    const response = await fetch(url)
    const data = await response.json()

    setAnalyticsData(data)
    setSelectedMonth(analyticData.month)
  }

  return (
    <div>
      <h1>{selectedMonth ? `Month - ${selectedMonth}` : 'Months'}</h1>
      {tabs.map((tab) => (
        <button 
          className={`mr-3 ${tab.id === selectedTab.id && 'underline'}`} 
          key={tab.id} 
          onClick={() => {setSelectedTab(tab), setSelectedMonth(null)}}
        >
          {tab.title}
        </button>
      ))}
      {selectedMonth ? analyticsData.map(data => {return <TransactionCard key={data.id} editDate={false} transaction={data as transaction} />}) : analyticsData.map(data => {
        return <div onClick={() => {fetchMonth(data as analyticsApiItem)}} key={data.id} className="rounded p-3 border border-black mb-3 pointer">
          <AnalyticsTab data={data as analyticsApiItem} />
        </div>
      })}
    </div>
  )
}

export default Page
'use client'

import { AnalyticsTab } from "../../components/analyticsTab/analyticsTab"
import { analyticsTabs } from "@/enums/analyticsTabs"
import { useState } from "react"

const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(analyticsTabs.Summary)

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

  return (
    <div>
      {tabs.map((tab) => (
        <button className={`mr-3 ${tab.title === selectedTab && 'underline'}`} key={tab.id} onClick={() => {setSelectedTab(tab.title)}}>{tab.title}</button>
      ))}
      <AnalyticsTab title={selectedTab} />
    </div>
  )
}

export default Page
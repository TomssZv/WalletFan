
import { analyticsApiItem } from "@/common/types/api";

interface analyticsTabProps {
  data: analyticsApiItem
}
export const AnalyticsTab: React.FC<analyticsTabProps> = ({ data }) => {

  return (
    <div>
        <span>{data.createdAt.substring(0, 4)} - {data.month}</span>
        {data.categoryName && <h2>{data.categoryName}</h2>}
        {data.groupName && <h2>{data.groupName}</h2>}
        <p>Amount: <span className={data.amount.toString().includes("-") ? "text-red-300" : "text-green-300"}>{data.amount}</span></p>
    </div>
  )
}
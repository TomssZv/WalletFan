import { analyticsTabs, analyticsTabApi } from "@/enums/analyticsTabs";
import toast from "react-hot-toast";

export const AnalyticsTabRoutes = (tab: string) => {
  switch (tab) {

    case analyticsTabs.Summary:
      return {
        init: analyticsTabApi.SummaryInitFetch,
        month: analyticsTabApi.SummaryMonthFetch
      }

    case analyticsTabs.Category:
      return {
        init: analyticsTabApi.CategoryInitFetch,
        month: analyticsTabApi.CategoryMonthFetch
      }

    case analyticsTabs.Group:
      return {
        init: analyticsTabApi.GroupInitFetch,
        month: analyticsTabApi.GroupMonthFetch
      }

    default:
      toast.error("No route found!")
      return {error: "No route found!"}
  }
}
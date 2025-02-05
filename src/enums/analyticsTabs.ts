export enum analyticsTabs {
  Summary = 'Summary',
  Category = 'Category',
  Group = 'Group',
}

export enum analyticsTabApi {
  SummaryInitFetch = '/analytics/getSummary',
  SummaryMonthFetch = '/analytics/getMonth',
  CategoryInitFetch = '/category/getAnalytics',
  CategoryMonthFetch = '/category/getMonth',
  GroupInitFetch = '/group/getAnalytics',
  GroupMonthFetch = '/group/getMonth',
}

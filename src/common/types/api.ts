import { category } from "./global";

export interface analyticsApiItem {
  id: string,
  amount: number,
  deducted?: boolean,
  isLongTerm?: boolean,
  comment?: string,
  createdAt: string,
  categoryId?: number,
  groupId?: number,
  groupName?: string,
  categoryName?: string,
  month: string,
  category?: category
}
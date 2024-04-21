export interface transactionApiItem {
  id: number,
  amount: number,
  deducted: boolean,
  isLongTerm: boolean,
  comment: string,
  createdAt: string,
  categoryId: number,
  groupId: number | null,
  category: category
}

export interface category {
  id: number,
  name: string
}
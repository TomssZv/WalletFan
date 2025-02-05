export interface category {
  id: number;
  name: string;
}

export interface transaction {
  id: number;
  amount: number;
  deducted: boolean;
  isLongTerm: boolean;
  comment: string;
  createdAt: string;
  categoryId: number;
  groupId?: number;
  category: category;
}

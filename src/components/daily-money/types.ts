
export interface ExpenseItem {
  category: string;
  name: string;
  amount: number;
  percentage?: number;
}

export interface CategoryItem {
  name: string;
  percentage: number;
}

export interface CategorySummary {
  name: string;
  total: number;
  percentage: number;
}

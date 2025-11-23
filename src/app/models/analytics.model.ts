export interface DailyIncome {
  date: string;
  totalIncome: number;
  orderCount: number;
}

export interface ProductIncomeBreakdown {
  name: string;
  totalIncome: number;
  quantitySold: number;
  percentage: number;
}

export interface ProductOrderBreakdown {
  name: string;
  orderCount: number;
  totalQuantity: number;
  percentage: number;
}
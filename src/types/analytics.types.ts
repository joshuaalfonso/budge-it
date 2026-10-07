


export interface MonthlyReport {
  filters: Filters
  summary: Summary
  dailySpending: DailySpending[]
  spendingByCategory: SpendingByCategory[]
}

export interface YearlyReport {
  filters: Filters
  summary: Summary;
  monthlySummary: MonthlySummary[];
  spendingByCategory: SpendingByCategory[];
}


export interface Filters {
  year: number
  month: number
}

export interface Summary {
  totalIncome: number
  totalExpense: number
  incomePercentage: number
  expensePercentage: number
  savingsPercentage: number
  savings: number
  totalTransactions: number
}

export interface DailySpending {
  date: string
  totalExpense: string
}

export interface MonthlySummary {
  month: number
  totalIncome: number
  totalExpense: number
  savings: number
  totalTransactions: number
}

export interface SpendingByCategory {
  categoryId: number
  categoryName: string
  icon?: string
  color?: string
  total: string
}


export type ReportTab = "month" | "year";

export type ReportPeriod =
    | {
          type: "month";
          month: number;
          year: number;
      }
    | {
          type: "year";
          year: number;
      };






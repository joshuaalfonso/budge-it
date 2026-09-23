


export interface MonthlyReport {
  filters: Filters
  summary: Summary
  dailySpending: DailySpending[]
  spendingByCategory: SpendingByCategory[]
}

export interface Filters {
  year: number
  month: number
}

export interface Summary {
  totalIncome: number
  totalExpense: number
  savings: number
  totalTransactions: number
}

export interface DailySpending {
  date: string
  totalExpense: string
}

export interface SpendingByCategory {
  categoryId: number
  categoryName: string
  icon?: string
  color?: string
  total: string
}

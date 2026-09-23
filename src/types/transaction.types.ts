export interface Transaction {
    id: number
    type: TransactionType
    amount: string
    transactionDate: string
    description: string
    walletId: number
    walletName: string
    categoryId: number
    categoryName: string
    createdAt: string
    updatedAt: string
}


export interface TransactionRequest {
    id: number
    wallet_id: number
    category_id: number
    type: TransactionType
    amount: string
    description: string
    transaction_date: string
}

export interface TransactionFilters {
  wallet_id?: string;
  category_id?: string;
  type?: TransactionType | undefined;
  start_date?: string;
  end_date?: string;
  page?: string;
  limit?: string;
  cursor_date?: string;
  cursor_id?: number;
  direction?: 'next' | 'previous'
}

export type TransactionType = "income" | "expense";


export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: StartCursor
  endCursor: EndCursor
}

export interface StartCursor {
  transaction_date: string
  id: number
}

export interface EndCursor {
  transaction_date: string
  id: number
}

export interface TransactionPaginated {
  data: Transaction[]
  pageInfo: PageInfo
}
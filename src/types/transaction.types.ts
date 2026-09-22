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

export type TransactionType = "income" | "expense";
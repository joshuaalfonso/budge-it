


export type WalletType = 'cash' | 'e_wallet' | 'credit_card' | 'savings' | 'other';

export interface Wallet {
    id: number,
    name: string,
    type: WalletType,
    initialBalance: string,
    createdAt: string
}

export interface WalletRequest {
    id: number,
    name: string,
    type: WalletType,
    initial_balance: string,
}
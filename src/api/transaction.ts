import { api } from "./axios"
import type { Transaction, TransactionRequest } from "@/types/transaction.types";


const TABLE_NAME = 'transaction';

export const transactionApi =  {

    getAll: async () => {
        const response = await api.get<Transaction[]>(`${TABLE_NAME}`);
        return response.data;
    },

    create: async (newItem: TransactionRequest) => {
        const response = await api.post<{success: boolean, message: string, data: Transaction}>(`${TABLE_NAME}`, newItem);
        return response.data;
    },

    update: async (newItem: TransactionRequest) => {
        const response = await api.put<{success: boolean, message: string, data: Transaction}>(`${TABLE_NAME}/${newItem.id}`, newItem);
        return response.data;
    },

    delete: async (id: Transaction['id']) => {
        const response = await api.delete<{success: boolean, message: string}>(`${TABLE_NAME}/${id}`);
        return response.data;
    }

}
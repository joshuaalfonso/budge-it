import { api } from "./axios"
import type { Transaction, TransactionFilters, TransactionRequest } from "@/types/transaction.types";


const TABLE_NAME = 'transaction';

export interface Pagination {
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextCursor: NextCursor
  previousCursor: PreviousCursor
}

export interface NextCursor {
  cursor_date: string
  cursor_id: number
}

export interface PreviousCursor {
  cursor_date: string
  cursor_id: number
}

export const transactionApi =  {

    getAll: async (filters: TransactionFilters) => {

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, value);
            }
        });

        const response = await api.get<{data: Transaction[], pagination: Pagination}>(`${TABLE_NAME}?${params.toString()}`);
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
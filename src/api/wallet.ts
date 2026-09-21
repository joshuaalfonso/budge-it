import type { Wallet, WalletRequest } from "@/types/wallet.types";
import { api } from "./axios"


const TABLE_NAME = 'wallet';

export const walletApi = () => {
    return {

        getAll: async () => {
            const response = await api.get<Wallet[]>(`${TABLE_NAME}`);
            return response.data;
        },

        create: async (newItem: WalletRequest) => {
            const response = await api.post<{success: boolean, message: string, data: Wallet}>(`${TABLE_NAME}`, newItem);
            return response.data;
        },

        update: async (newItem: WalletRequest) => {
            const response = await api.put<{success: boolean, message: string, data: Wallet}>(`${TABLE_NAME}/${newItem.id}`, newItem);
            return response.data;
        },

        delete: async (id: Wallet['id']) => {
            const response = await api.delete<{success: boolean, message: string}>(`${TABLE_NAME}/${id}`);
            return response.data;
        }

    }
}
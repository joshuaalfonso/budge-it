import { api } from "./axios";


const TABLE_NAME = 'setting';

export const settingApi = {

    deleteTransaction: async () => {
        const response = await api.delete<{success: boolean, message: string}>(`${TABLE_NAME}/delete-transaction`);
        return response.data;
    },

    deleteAllData: async () => {
        const response = await api.delete<{success: boolean, message: string}>(`${TABLE_NAME}/delete-all-data`);
        return response.data;
    }

}
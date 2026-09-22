import type { Category, CategoryRequest } from "@/types/category.type";
import { api } from "./axios"


const TABLE_NAME = 'category';

export const categoryApi =  {

    getAll: async () => {
        const response = await api.get<Category[]>(`${TABLE_NAME}`);
        return response.data;
    },

    create: async (newItem: CategoryRequest) => {
        const response = await api.post<{success: boolean, message: string, data: Category}>(`${TABLE_NAME}`, newItem);
        return response.data;
    },

    update: async (newItem: CategoryRequest) => {
        const response = await api.put<{success: boolean, message: string, data: Category}>(`${TABLE_NAME}/${newItem.id}`, newItem);
        return response.data;
    },

    delete: async (id: Category['id']) => {
        const response = await api.delete<{success: boolean, message: string}>(`${TABLE_NAME}/${id}`);
        return response.data;
    }

}
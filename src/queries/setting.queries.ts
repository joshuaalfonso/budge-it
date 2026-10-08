import { settingApi } from "@/api/settings";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteAllTransaction = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: settingApi.deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_monthly_report'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_yearly_report'] })
        },
    })
}

export const useDeleteAllData= () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: settingApi.deleteAllData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['category'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_monthly_report'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_yearly_report'] })
        },
    })
}
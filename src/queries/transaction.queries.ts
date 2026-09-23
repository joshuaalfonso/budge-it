import { transactionApi } from "@/api/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useTransaction = () => {
    return  useQuery({
        queryKey: ['transaction'],
        queryFn: transactionApi.getAll,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}


export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: transactionApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_monthly_report'] })
        },
    })
}

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: transactionApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_monthly_report'] })
        },
    })
}

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: transactionApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['analytics_monthly_report'] })
        },
    })
}
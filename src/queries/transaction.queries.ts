import { transactionApi } from "@/api/transaction";
import type { TransactionFilters } from "@/types/transaction.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useTransaction = (filters: TransactionFilters) => {
    return useQuery({
        queryKey: ['transaction', filters],
        queryFn: () => transactionApi.getAll(filters),
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};


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
import { walletApi } from "@/api/wallet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


const api = walletApi();


export const useWallet = () => {
    return  useQuery({
        queryKey: ['wallet'],
        queryFn: api.getAll,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}


export const useCreateWallet = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: api.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        },
    })
}

export const useUpdateWallet = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: api.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
        },
    })
}

export const useDeleteWallet = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: api.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard'] })
        },
    })
}
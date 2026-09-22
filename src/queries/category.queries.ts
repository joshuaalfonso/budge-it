import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { categoryApi } from "@/api/category"



export const useCategory = () => {
    return  useQuery({
        queryKey: ['category'],
        queryFn: categoryApi.getAll,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}


export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: categoryApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return  useMutation({
        mutationFn: categoryApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] })
        },
    })
}
import { getDashboard } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";


export const useDashboard = () => {
    return  useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboard,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}


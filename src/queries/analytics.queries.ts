import { analyticsApi } from "@/api/analytics"
import { useQuery } from "@tanstack/react-query"





export const useMonthlyReport = () => {
    return  useQuery({
        queryKey: ['analytics_monthly_report'],
        queryFn: analyticsApi.getMonthlyReport,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}
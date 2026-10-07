import { analyticsApi } from "@/api/analytics"
import { keepPreviousData, useQuery } from "@tanstack/react-query"



type MonthlyReportParams = {
    month?: number
    year?: number
}

type YearlyReportParams = {
    year?: number
}

export const useMonthlyReport = (params?: MonthlyReportParams) => {
    return useQuery({
        queryKey: ["analytics_monthly_report", params],
        queryFn: () => analyticsApi.getMonthlyReport(params),
         placeholderData: keepPreviousData,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}

export const useYearlyReport = (params?: YearlyReportParams) => {
    return useQuery({
        queryKey: ["analytics_yearly_report", params],
        queryFn: () => analyticsApi.getYearlyReport(params),
        placeholderData: keepPreviousData,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}
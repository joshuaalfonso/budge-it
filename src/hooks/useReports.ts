import { useMonthlyReport, useYearlyReport } from "@/queries/analytics.queries";
import type { ReportPeriod } from "@/types/analytics.types";

export function useReport(period: ReportPeriod) {
    const monthlyReport = useMonthlyReport({
        month:
            period.type === "month"
                ? period.month
                : new Date().getMonth() + 1,
        year: period.year,
    });

    const yearlyReport = useYearlyReport({
        year: period.year,
    });

    if (period.type === "month") {
        return {
            period,
            report: monthlyReport.data,
            isPending: monthlyReport.isPending,
            isFetching: monthlyReport.isFetching,
            error: monthlyReport.error,
        };
    }

    return {
        period,
        report: yearlyReport.data,
        isPending: yearlyReport.isPending,
        isFetching: monthlyReport.isFetching,
        error: monthlyReport.error,
    };
}

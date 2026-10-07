import type {
    ReportPeriod,
    ReportSummary as ReportSummaryData,
} from "@/types/analytics.types";
import ReportSummaryCard from "./ReportSummaryCard";


interface ReportSummaryProps {
    summary: ReportSummaryData;
    period: ReportPeriod;
}

export default function ReportSummary({
    summary,
    period,
}: ReportSummaryProps) {
    const periodLabel =
        period.type === "month"
            ? "This month"
            : "This year";

    return (
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <ReportSummaryCard
                label="Income"
                value={summary.totalIncome}
                percentage={summary.incomePercentage}
                trend="income"
            />

            <ReportSummaryCard
                label="Expenses"
                value={summary.totalExpense}
                percentage={summary.expensePercentage}
                trend="expense"
            />

            <ReportSummaryCard
                label="Savings"
                value={summary.savings}
                percentage={summary.savingsPercentage}
                trend="neutral"
                percentageLabel="of income"
            />

            <ReportSummaryCard
                label="Transactions"
                value={summary.totalTransactions}
                trend="neutral"
                valueType="number"
                footer={periodLabel}
            />
        </section>
    );
}

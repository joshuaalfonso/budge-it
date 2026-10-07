import SpendTrendChart from "@/components/reports/SpendTrendChart";
import type {
    DailySpending,
    ReportPeriod,
} from "@/types/analytics.types";

interface SpendingTrendSectionProps {
    dailySpending: DailySpending[];
    totalExpense: number;
    period: ReportPeriod;
}

export default function SpendingTrendSection({
    dailySpending,
    totalExpense,
    period,
}: SpendingTrendSectionProps) {
    const description =
        period.type === "month"
            ? "Track how your expenses change over time"
            : "Track how your expenses change throughout the year";

    return (
        <section className="rounded-md border bg-(--chakra-colors-bg-subtle) p-4! sm:p-5!">
            <div className="mb-8!">
                <h2 className="text-base! font-semibold!">
                    Spending trend
                </h2>

                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    {description}
                </p>
            </div>

            <div className="mt-8! flex min-h-64 items-center justify-center rounded-md bg-(--chakra-colors-bg-subtle)">
                {period.type === "month" && (
                    <SpendTrendChart
                        dailySpending={dailySpending}
                        totalExpense={totalExpense}
                    />
                )}
            </div>
        </section>
    );
}

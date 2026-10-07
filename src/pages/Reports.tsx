// import { useReport } from "@/hooks/useReports";
import ReportHeader from "@/components/reports/ReportHeader";
import { useReportPeriod } from "@/hooks/useReportPeriod";
import ReportSummary from "@/components/reports/ReportSummary";
import SpendingTrendSection from "@/components/reports/SpendTrendSection";
import { useReport } from "@/hooks/useReports";
import { MonthlySummaryChart } from "@/components/reports/MonthlySummaryChart";

export default function Reports() { 

     const {
        period,
        tabValue,
        selectedDate,
        setTabValue,
        setSelectedDate,
    } = useReportPeriod();

    const {
        report,
        isPending,
        isFetching,
        error,
    } = useReport(period);


    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <div >

           <ReportHeader
                tabValue={tabValue}
                selectedDate={selectedDate}
                isFetching={isFetching}
                onTabChange={setTabValue}
                onDateChange={setSelectedDate}
            />

             <div className="space-y-4! sm:space-y-6!">
                <ReportSummary
                    summary={report?.summary}
                    period={period}
                />


            {period.type === "month" && report && "dailySpending" in report ? (
                <SpendingTrendSection
                    dailySpending={report.dailySpending ?? []}
                    totalExpense={report.summary.totalExpense}
                    period={period}
                />
            ) : null}

            {period.type === "year" && report && "monthlySummary" in report ? (
                <MonthlySummaryChart
                  monthlySummary={report.monthlySummary ?? []}
                />
            ) : null}

                {/* <SpendingByCategorySection
                    spendingByCategory={report.spendingByCategory ?? []}
                    period={period}
                /> */}
            </div>

            {/* <div className="space-y-4! sm:space-y-6!">

                <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Income
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            {formatCurrency(monthlyReport.summary.totalIncome)}
                        </p>

                        {monthlyReport.summary.incomePercentage != null && (
                            <div
                                className={`mt-2! flex items-center gap-1 text-xs! ${
                                    monthlyReport.summary.incomePercentage >= 0
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-red-600 dark:text-red-400"
                                }`}
                            >
                                {monthlyReport.summary.incomePercentage >= 0 ? (
                                    <LuArrowUpRight size={14} />
                                ) : (
                                    <LuArrowDownRight size={14} />
                                )}

                                {Math.abs(monthlyReport.summary.incomePercentage).toFixed(1)}%
                            </div>
                        )}
                    </div>

                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Expenses
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            {formatCurrency(monthlyReport.summary.totalExpense)}
                        </p>

                        {monthlyReport.summary.expensePercentage != null && (
                            <div
                                className={`mt-2! flex items-center gap-1 text-xs! ${
                                    monthlyReport.summary.expensePercentage >= 0
                                        ? "text-red-600 dark:text-red-400"
                                        : "text-green-600 dark:text-green-400"
                                }`}
                            >
                                {monthlyReport.summary.expensePercentage >= 0 ? (
                                    <LuArrowUpRight size={14} />
                                ) : (
                                    <LuArrowDownRight size={14} />
                                )}

                                {Math.abs(monthlyReport.summary.expensePercentage).toFixed(1)}%
                            </div>
                        )}
                    </div>

                     <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Savings
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                           {formatCurrency(monthlyReport.summary.savings)}
                        </p>

                        <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                            {monthlyReport.summary.savingsPercentage != null ? monthlyReport.summary.savingsPercentage.toFixed(1) : 0}%
                            of income
                        </p>
                    </div>

                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Transactions
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            {Math.abs(monthlyReport.summary.totalTransactions).toLocaleString()}
                        </p>

                        <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                            This month
                        </p>
                    </div>
                </section>

                <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                    <div className="mb-8!">
                        <h2 className="text-base! font-semibold!">
                            Spending trend
                        </h2>

                        <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                            Track how your expenses change over time
                        </p>
                    </div>

                    <div className="flex min-h-64 mt-8! items-center justify-center rounded-md bg-(--chakra-colors-bg-subtle)">
                        <SpendTrendChart 
                            dailySpending={monthlyReport.dailySpending ?? []} 
                            totalExpense={monthlyReport?.summary?.totalExpense ?? 0}
                        />
                    </div>

                </section>

                <div className="grid gap-4 lg:grid-cols-1">

                    <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                        <div className="mb-8!">
                            <h2 className="text-base! font-semibold!">
                                Spending by category
                            </h2>

                            <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                                Where your money went this month
                            </p>
                        </div>

                            <ScrollArea.Root height="64" size="xs" >
                                <ScrollArea.Viewport>
                                <ScrollArea.Content   paddingEnd="5" className="h-full">
                                    <SpendByCategoryChart 
                                        spendingByCategory={monthlyReport.spendingByCategory} 
                                    />
                                </ScrollArea.Content>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar>
                                <ScrollArea.Thumb />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner />
                            </ScrollArea.Root>
                            
                    </section>


                </div>

            </div> */}
        </div>
    );
}
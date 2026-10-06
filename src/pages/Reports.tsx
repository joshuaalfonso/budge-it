
import SpendByCategoryChart from "@/components/reports/SpendByCategoryChart";
// import SpendByWalletChart from "@/components/reports/SpendByWalletChart";
import SpendTrendChart from "@/components/reports/SpendTrendChart";
import { useMonthlyReport } from "@/queries/analytics.queries";
import { useCurrencyStore } from "@/stores/currency.store";
import { DatePicker, parseDate, Portal, ScrollArea, type DateValue } from "@chakra-ui/react";
import { LuArrowDownRight, LuArrowUpRight, LuCalendar, LuLoader } from "react-icons/lu";
import { CalendarDate } from "@internationalized/date"
import { useState } from "react";
import { colorPallette } from "@/constants";

export default function Reports() { 
 
    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState<DateValue[]>([parseDate(currentDate)]);

    const selectedMonth = selectedDate[0].month;
    const selectedYear = selectedDate[0].year;


    const { data:monthlyReport, isPending, isFetching, error } = useMonthlyReport({
        month: selectedMonth,
        year: selectedYear
    });

     const formatCurrency = useCurrencyStore(
            (state) => state.formatCurrency
    );

    const format = (date: DateValue) => {
        const month = date.month.toString().padStart(2, "0")
        const year = date.year.toString()
        return `${month}/${year}`
    }

    const parse = (string: string) => {
        const fullRegex = /^(\d{1,2})\/(\d{4})$/
        const fullMatch = string.match(fullRegex)
        if (fullMatch) {
            const [, month, year] = fullMatch.map(Number)
            return new CalendarDate(year, month, 1)
        }
    }


    if (isPending) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <div >
            {/* Header */}
            <div className="mb-6! flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                            Reports
                        </h1>
                        {isFetching && (
                            <LuLoader className="animate-spin text-(--chakra-colors-fg-muted)" size={18} />
                        )}
                    </div>

                     <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                        Understand your spending habits
                    </p>

                </div>

                <div className="flex justify-end">
                    <DatePicker.Root
                        format={format}
                        parse={parse}
                        value={selectedDate}
                        onValueChange={(details) => {
                            setSelectedDate(details.value);
                        }}
                        defaultView="month"
                        minView="month"
                        placeholder="mm/yyyy"
                        maxWidth="10rem"
                        bg="bg.subtle"
                    >
                        <DatePicker.Control>
                            <DatePicker.Input  colorPalette={colorPallette} />
                            <DatePicker.IndicatorGroup>
                            <DatePicker.Trigger>
                                <LuCalendar />
                            </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                        </DatePicker.Control>
                        <Portal>
                            <DatePicker.Positioner>
                            <DatePicker.Content>
                                <DatePicker.View view="month">
                                <DatePicker.Header />
                                <DatePicker.MonthTable  colorPalette={colorPallette} />
                                </DatePicker.View>
                                <DatePicker.View view="year">
                                <DatePicker.Header />
                                <DatePicker.YearTable  colorPalette={colorPallette} />
                                </DatePicker.View>
                            </DatePicker.Content>
                            </DatePicker.Positioner>
                        </Portal>
                    </DatePicker.Root>
                </div>


            </div>

            <div className="space-y-4! sm:space-y-6!">
                {/* Overview */}
                <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Income
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            {/* ₱ {Math.abs(monthlyReport.summary.totalIncome).toLocaleString()} */}
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
                            {/* ₱ {Math.abs(monthlyReport.summary.totalExpense).toLocaleString()} */}
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
                           {/* ₱ {Math.abs(monthlyReport.summary.savings).toLocaleString()} */}
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

                {/* Spending trend */}
                <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                    <div className="mb-8!">
                        <h2 className="text-base! font-semibold!">
                            Spending trend
                        </h2>

                        <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                            Track how your expenses change over time
                        </p>
                    </div>

                    {/* Chart */}
                    <div className="flex min-h-64 mt-8! items-center justify-center rounded-md bg-(--chakra-colors-bg-subtle)">
                        <SpendTrendChart 
                            dailySpending={monthlyReport.dailySpending ?? []} 
                            totalExpense={monthlyReport?.summary?.totalExpense ?? 0}
                        />
                    </div>

                </section>

                {/* Breakdown */}
                <div className="grid gap-4 lg:grid-cols-1">
                    {/* Categories */}
                    <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                        <div className="mb-8!">
                            <h2 className="text-base! font-semibold!">
                                Spending by category
                            </h2>

                            <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                                Where your money went this month
                            </p>
                        </div>

                            
                            {/* <div className="h-64 rounded-xl bg-(--chakra-colors-bg-subtle)"> */}
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
                            {/* </div> */}
                            
                    </section>


                    {/* Wallets */}
                    {/* <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                        <div className="mb-5!">
                            <h2 className="text-base! font-semibold!">
                                Spending by wallet
                            </h2>

                           <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                                Compare activity across your wallets
                            </p>
                        </div>

                        <div className="flex h-64 items-center justify-center rounded-xl bg-(--chakra-colors-bg-subtle)">
                            <SpendByWalletChart />
                        </div>
                    </section> */}
                </div>

            </div>
        </div>
    );
}
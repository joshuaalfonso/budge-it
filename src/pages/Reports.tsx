
import SpendTrendChart from "@/components/reports/SpendTrendChart";
import { LuArrowDownRight, LuArrowUpRight, LuCalendarDays } from "react-icons/lu";


export default function Reports() {

    return (
        <div >
            {/* Header */}
            <div className="mb-6! flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl! font-semibold! tracking-tight">
                        Reports
                    </h1>

                     <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                        Understand your spending habits
                    </p>
                </div>

                <button
                    type="button"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-md  bg-(--chakra-colors-bg-subtle)! px-4! text-sm! font-medium! transition sm:w-auto"
                >
                    <LuCalendarDays size={17} />
                    September 2026
                </button>
            </div>

            <div className="space-y-4! sm:space-y-6!">
                {/* Overview */}
                <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Income
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            ₱38,500
                        </p>

                        <div className="mt-2! flex items-center gap-1 text-xs! text-emerald-600 dark:text-emerald-400">
                            <LuArrowUpRight size={14} />
                            12.4%
                        </div>
                    </div>

                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Expenses
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            ₱20,380
                        </p>

                        <div className="mt-2! flex items-center gap-1 text-xs! text-red-600 dark:text-red-400">
                            <LuArrowDownRight size={14} />
                            8.2%
                        </div>
                    </div>

                     <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Savings
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            ₱18,120
                        </p>

                        <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                            47.1% of income
                        </p>
                    </div>

                    <div className="rounded-md p-4! bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Transactions
                        </p>

                        <p className="mt-2! text-xl! font-semibold!">
                            42
                        </p>

                        <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                            This month
                        </p>
                    </div>
                </section>

                {/* Spending trend */}
                <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                    <div className="mb-5!">
                        <h2 className="text-base! font-semibold!">
                            Spending trend
                        </h2>

                        <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                            Track how your expenses change over time
                        </p>
                    </div>

                    {/* Chart */}
                    <div className="flex h-auto items-center justify-center rounded-md bg-(--chakra-colors-bg-subtle)">
                        {/* <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Your chart goes here
                        </p> */}

                        <SpendTrendChart />

                    </div>

                </section>

                {/* Breakdown */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Categories */}
                    <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                        <div className="mb-5!">
                            <h2 className="text-base! font-semibold!">
                                Spending by category
                            </h2>

                            <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                                Where your money went this month
                            </p>
                        </div>

                        <div className="flex h-64 items-center justify-center rounded-xl bg-(--chakra-colors-bg-subtle)">
                            <p className="text-sm text-zinc-400">
                                Your chart goes here
                            </p>
                        </div>
                    </section>

                    {/* Wallets */}
                    <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                        <div className="mb-5!">
                            <h2 className="text-base! font-semibold!">
                                Spending by wallet
                            </h2>

                           <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                                Compare activity across your wallets
                            </p>
                        </div>

                        <div className="flex h-64 items-center justify-center rounded-xl bg-(--chakra-colors-bg-subtle)">
                        <p className="text-sm text-zinc-400">
                            Your chart goes here
                        </p>
                        </div>
                    </section>
                </div>

                {/* Top categories */}
                <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
                    <div className="mb-5!">
                        <h2 className="text-base! font-semibold!">
                            Top spending categories
                        </h2>

                        <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                            Your biggest expense categories this month
                        </p>
                    </div>

                    <div className="space-y-4!">
                        {[
                            { name: "Food", amount: 6450, percentage: 32 },
                            { name: "Bills", amount: 5200, percentage: 26 },
                            { name: "Shopping", amount: 4200, percentage: 21 },
                            { name: "Transportation", amount: 2850, percentage: 14 },
                            { name: "Entertainment", amount: 1680, percentage: 8 },
                        ].map((category) => (

                            <div key={category.name}>
                                <div className="mb-1.5! flex items-center justify-between text-sm!">
                                    <span className="font-medium">
                                        {category.name}
                                    </span>

                                    <span className="text-(--chakra-colors-fg-muted)">
                                        ₱{category.amount.toLocaleString()}
                                    </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-(--chakra-colors-bg-muted)/80 ">
                                    <div
                                        className="h-full rounded-full bg-orange-400"
                                        style={{
                                        width: `${category.percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>

                        ))}
                    </div>

                </section>
            </div>
        </div>
    );
}
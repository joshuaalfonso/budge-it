import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";
import { useMemo, useState } from "react";

import TransactionList from "../components/transactions/TransactionList";
import { transactions } from "../data/transactions";

type Filter = "all" | "income" | "expense";

export default function Transactions() {
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
        const matchesFilter =
            filter === "all" || transaction.type === filter;

        const searchValue = search.toLowerCase();

        const matchesSearch =
            transaction.title.toLowerCase().includes(searchValue) ||
            transaction.category.toLowerCase().includes(searchValue) ||
            transaction.wallet.toLowerCase().includes(searchValue);

        return matchesFilter && matchesSearch;
        });
    }, [filter, search]);

    return (
        <div>
            <div className="mb-6!">
                <h1 className=" text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                    Transactions
                </h1>
                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    Keep track of where your money goes
                </p>
            </div>

            <div className="space-y-4!">
                {/* Search */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <LuSearch
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-(--chakra-colors-fg-muted)"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search transactions..."
                            className="h-11 w-full rounded-xl bg-(--chakra-colors-bg-subtle)!  pl-10! pr-4! text-sm! outline-none transition "
                            />
                    </div>

                    <button
                        type="button"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl! transition  sm:w-auto sm:px-4! bg-(--chakra-colors-bg-subtle)!"
                    >
                        <LuSlidersHorizontal size={18} />

                        <span className="ml-2! hidden text-sm! font-medium! sm:inline">
                            Filters
                        </span>
                    </button>
                </div>

                {/* Filter */}
                <div className="flex gap-2 overflow-x-auto pb-1!">
                    {[
                        { label: "All", value: "all" },
                        { label: "Income", value: "income" },
                        { label: "Expenses", value: "expense" },
                    ].map((item) => {
                        const active = filter === item.value;

                        return (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setFilter(item.value as Filter)}
                            className={`shrink-0 rounded-md px-4! py-2! text-sm! font-medium! transition ${
                            active
                                ? "bg-orange-400/10! text-orange-400! "
                                : "bg-(--chakra-colors-bg-subtle)!"
                            }`}
                        >
                            {item.label}
                        </button>
                        );
                    })}
                </div>

                {/* Results */}
                <TransactionList transactions={filteredTransactions} />
            </div>

            {/* Mobile add button */}
            <button
                type="button"
                className="fixed bottom-24 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl text-white shadow-lg transition active:scale-95 dark:bg-white dark:text-zinc-900 lg:hidden"
            >
                +
            </button>
        </div>
    );
}
import { LuSearch, LuSlidersHorizontal } from "react-icons/lu";
// import { useMemo, useState } from "react";

import TransactionList from "../components/transactions/TransactionList";
import { useTransaction } from "@/queries/transaction.queries";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import { Button } from "@chakra-ui/react";
import { colorPallette } from "@/constants";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { useTransactionFilters } from "@/hooks/useTransactionFilter";



export default function Transactions() {
    
    const setOpen = useTransactionDialogStore((state) => state.setOpen);

    const { filters, setFilter, setCursor } = useTransactionFilters();

    const { data: transactions, isPending, error } = useTransaction(filters);

    if (isPending) return <>Loading...</>;
    if (error) return <>Something went wrong</>;

    return (
        <div>

            <TransactionDialog />

            <div className="flex items-center justify-between mb-6!">
                <div>
                    <h1 className=" text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                        Transactions
                    </h1>
                    <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                        Keep track of where your money goes
                    </p>
                </div>
                <Button size="sm" colorPalette={colorPallette} onClick={() => setOpen(true)} >
                    Add Transaction
                </Button>
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
                            // value={search}
                            // onChange={(event) => setSearch(event.target.value)}
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
                        { label: "All", value: undefined },
                        { label: "Income", value: "income" },
                        { label: "Expenses", value: "expense" },
                    ].map((item) => {
                        const active = filters.type === item.value;

                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setFilter('type', item.value)}
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

                <TransactionList transactions={transactions.data ?? []} />

                <div className="flex items-center justify-end gap-4">
                    <Button
                        variant="subtle"
                        size="sm"
                        disabled={
                            !transactions.pagination.hasPreviousPage ||
                            !transactions.pagination.previousCursor
                        }
                        onClick={() => {

                            const cursor =
                                transactions.pagination.previousCursor;

                            setCursor(
                                cursor.cursor_date, 
                                cursor.cursor_id,
                                'previous'
                            )
                        }}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="subtle"
                        size="sm"
                        disabled={
                            !transactions.pagination.hasNextPage ||
                            !transactions.pagination.nextCursor
                        }
                        onClick={() => {

                            const cursor =
                                transactions.pagination.nextCursor;

                            setCursor(
                                cursor.cursor_date, 
                                cursor.cursor_id,
                                'next'
                            )
                        }}
                    >
                        Next
                    </Button>
                </div>


            </div>

            <button
                type="button"
                className="fixed bottom-24 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-xl text-white shadow-lg transition active:scale-95 dark:bg-white dark:text-zinc-900 lg:hidden"
            >
                +
            </button>
        </div>
    );
}
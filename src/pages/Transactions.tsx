import TransactionList from "../components/transactions/TransactionList";
import { useTransaction } from "@/queries/transaction.queries";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import { Button } from "@chakra-ui/react";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { useTransactionFilters } from "@/hooks/useTransactionFilter";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import TransactionControls from "@/components/transactions/TransactionControls";
import TransactionHeader from "@/components/transactions/TransactionHeader";
import { useCategory } from "@/queries/category.queries";

export default function Transactions() {

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 400);

    const setOpen = useTransactionDialogStore((state) => state.setOpen);

    const { filters, setFilter, setCursor } = useTransactionFilters();

    const { data: transactions, isPending, isFetching, error } = useTransaction(filters);
    const { data: categories } = useCategory();

    useEffect(() => {
        setFilter({ 'search': debouncedSearch });
    }, [debouncedSearch]);

    if (isPending) return <>Loading...</>;
    if (error) return <>Something went wrong</>;

    return (
        <div>
            <TransactionDialog />

            <TransactionHeader
                isFetching={isFetching} 
                onOpenDialog={() => setOpen(true)} 
            />

            <div className="space-y-5!">

                <TransactionControls
                    search={search}
                    categories={categories ?? []}
                    setSearch={setSearch}
                    currentType={filters.type}
                    currentCategory={filters.category_id}
                    onTypeChange={(value) => setFilter({ type: value })}
                    onCategoryChange={(value) => setFilter({ category_id: value?.toString() })}
                    onDateChange={(details) => {
                        const [startDate, endDate] = details.value;
                        // console.log(details.value)
                        if (startDate && endDate) {
                            setFilter({
                                start_date: startDate?.toString(),
                                end_date: endDate?.toString(),
                            });
                        } else if (!startDate && !endDate) {
                            setFilter({
                                start_date: undefined,
                                end_date: undefined,
                            });
                        }
                    }}
                />

                <TransactionList transactions={transactions.data ?? []} />

                {transactions.data?.length > 10 && (
                    <div className="flex items-center justify-end gap-4">
                        <Button
                            variant="subtle"
                            size="sm"
                            disabled={
                                !transactions.pagination.hasPreviousPage ||
                                !transactions.pagination.previousCursor
                            }
                            onClick={() => {
                                const cursor = transactions.pagination.previousCursor;
                                setCursor(cursor.cursor_date, cursor.cursor_id, 'previous')
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
                                const cursor = transactions.pagination.nextCursor;
                                setCursor(cursor.cursor_date, cursor.cursor_id, 'next')
                            }}
                        >
                            Next
                        </Button>
                    </div>
                )}

            </div>

        </div>
    );
}
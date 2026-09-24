import { useDeleteTransaction } from "@/queries/transaction.queries";
import { useCurrencyStore } from "@/stores/currency.store";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import type { Transaction } from "@/types/transaction.types";
import { Button, Menu, Portal } from "@chakra-ui/react";
import {
//   LuArrowDownLeft,
//   LuArrowUpRight,
  LuCar,
  LuCoffee,
  LuEllipsis,
  LuShoppingCart,
  LuWallet,
} from "react-icons/lu";


const icons = {
  Food: LuCoffee,
  Shopping: LuShoppingCart,
  Transportation: LuCar,
  Salary: LuWallet,
  Freelance: LuWallet,
};

type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList({
  transactions,
}: TransactionListProps) {

    const formatCurrency = useCurrencyStore(
        (state) => state.formatCurrency
    );

    const setSelected = useTransactionDialogStore((state) => state.setSelected);

    const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

    if (transactions.length === 0) {
        return (
            <div className="rounded-2xl border p-8! text-center bg-(--chakra-colors-bg-subtle)">
                <p className="text-sm font-medium">No transactions found</p>

                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden! rounded-md! border bg-(--chakra-colors-bg-subtle)! p-4! ">
            {transactions.map((transaction, index) => {
                const Icon = icons[transaction.categoryName as keyof typeof icons] ?? LuWallet;

                const isIncome = transaction.type === "income";

                return (
                    <div
                        key={transaction.id}
                        className={`flex items-center gap-3 p-4! sm:px-5! group ${
                        index !== transactions.length - 1
                            ? "border-b! "
                            : ""
                        }`}
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--chakra-colors-bg-emphasized)!">
                            <Icon
                                size={18}
                                className="text-(--chakra-colors-fg-muted)"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm! font-medium!">
                                {transaction.description}
                            </p>

                            <p className="mt-0.5! truncate text-xs! text-(--chakra-colors-fg-muted)">
                                {transaction.categoryName} · {transaction.walletName} ·{" "}
                                {transaction.transactionDate}
                            </p>
                        </div>

                        <div
                            className={`flex shrink-0 items-center gap-1 text-sm! font-semibold! ${
                                isIncome
                                ? "text-emerald-400 "
                                : "text-red-400 "
                            }`}
                            >
                            {isIncome ? "+" : "-"} 
                                {/* {Math.abs(+transaction.amount).toLocaleString()} */}
                            {formatCurrency(+transaction.amount)}
                        </div>
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant="ghost" size="xs" loading={isPending} >
                                    <LuEllipsis />
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="edit" onClick={() => setSelected(transaction)}>
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item value="delete" onClick={() => {
                                        deleteTransaction(transaction.id);
                                    }}>
                                        Delete
                                    </Menu.Item>
                                </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </div>
                );
            })}
        </div>
    );
}
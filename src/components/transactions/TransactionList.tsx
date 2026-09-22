import type { Transaction } from "@/types/transaction.types";
import {
//   LuArrowDownLeft,
//   LuArrowUpRight,
  LuCar,
  LuCoffee,
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
    if (transactions.length === 0) {
        return (
        <div className="rounded-2xl border bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-medium">No transactions found</p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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
                        className={`flex items-center gap-3 p-4! sm:px-5! ${
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
                            {/* {isIncome ? (
                                <LuArrowUpRight size={15} />
                            ) : (
                                <LuArrowDownLeft size={15} />
                            )} */}

                            {isIncome ? "+" : "-"} ₱
                            {Math.abs(+transaction.amount).toLocaleString()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
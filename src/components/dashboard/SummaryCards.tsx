import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";


interface Props {
    totalIncome: number;
    totalExpense: number;
}

export default function SummaryCards({ totalIncome, totalExpense }: Props) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Income */}
            <div className="rounded-2xl border p-4! bg-(--chakra-colors-bg-subtle)">
                <div className="flex items-center justify-between">
                    <p className="text-sm! text-(--chakra-colors-fg-muted)">
                        Income
                    </p>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <LuArrowUpRight size={17} />
                    </div>
                </div>

                <p className="mt-3! text-xl! font-semibold!">
                    ₱ {totalIncome.toLocaleString()}
                </p>
            </div>

            {/* Expenses */}
            <div className="rounded-2xl border p-4! bg-(--chakra-colors-bg-subtle)">
                <div className="flex items-center justify-between">
                <p className="text-sm! text-(--chakra-colors-fg-muted)">
                    Expenses
                </p>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <LuArrowDownRight size={17} />
                </div>
                </div>

                <p className="mt-3! text-xl! font-semibold!">
                    ₱ {totalExpense.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
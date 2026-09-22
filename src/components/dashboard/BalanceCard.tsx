import { LuArrowUpRight } from "react-icons/lu";


interface Props {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

export default function BalanceCard({ totalBalance, totalIncome, totalExpense }: Props) {
    return (
        // <section>
        //     <p className="text-sm! text-(--chakra-colors-fg-muted)">
        //         Total balance
        //     </p>

        //     <div className="mt-2!">
        //         <h1 className="text-3xl! font-semibold! tracking-tight! sm:text-4xl!">
        //             ₱ {totalBalance.toLocaleString()}
        //         </h1>
        //     </div>

        //     <div className="mt-4! flex items-center gap-2 text-sm! ">
        //         <span className="flex items-center gap-1 text-emerald-400">
        //         <LuArrowUpRight size={16} />
        //             ₱8,420
        //         </span>
        //         <span>this month</span>
        //     </div>
        // </section>

        <div className="w-full">

            <div className="rounded-3xl bg-(--chakra-colors-bg-subtle) p-6! border! border-(--chakra-colors-border) shadow-lg shadow-black/5 transition-all hover:shadow-xl">
                <div className="mb-6! rounded-2xl">
                    <p className="text-sm! text-(--chakra-colors-fg-muted)">Total Balance</p>

                    <div className="mt-2! flex items-center justify-between">
                        <h3 className="text-3xl! font-bold!">
                           ₱ {totalBalance.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="mb-3! flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                            ↑
                        </div>

                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Total Income
                        </p>

                        <p className="mt-1! text-xl! font-bold!">
                            ₱ {totalIncome.toLocaleString()}
                        </p>
                    </div>

                    <div >
                        <div className="mb-3! flex h-9 w-9 items-center justify-center rounded-full bg-red-400/10 text-red-400">
                            ↓
                        </div>

                        <p className="text-sm! text-(--chakra-colors-fg-muted)">
                            Total Expense
                        </p>

                        <p className="mt-1! text-xl! font-bold!">
                            ₱ {totalExpense.toLocaleString()}
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}
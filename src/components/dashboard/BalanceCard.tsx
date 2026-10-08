// import { LuArrowUpRight } from "react-icons/lu";

import { useMe } from "@/queries/auth.queries";
import { useCurrencyStore } from "@/stores/currency.store";


interface Props {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
}

export default function BalanceCard({ totalBalance, totalIncome, totalExpense }: Props) {

    const { data: user } = useMe();

    const formatCurrency = useCurrencyStore(
        (state) => state.formatCurrency
    );

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
            <div className="relative overflow-hidden rounded-3xl bg-(--chakra-colors-bg-subtle) p-6! border! border-(--chakra-colors-border) shadow-lg shadow-black/5 transition-all hover:shadow-xl">

                {/* Card Header */}
                <div className="flex items-start justify-between">

                    {/* <div>
                        <p className="text-xs! font-medium! uppercase tracking-[0.2em] text-(--chakra-colors-fg-muted)">
                            Debit Card
                        </p>

                        <p className="mt-1! text-sm! font-medium!">
                            Debit
                        </p>
                    </div> */}

                    {/* Chip */}
                    <div className="h-7 w-9 rounded-md bg-amber-200/80 border border-amber-300/40 relative overflow-hidden">
                        <div className="w-full h-full grid grid-cols-2 gap-px bg-amber-400/30 p-0.5">
                            <div className="border-r! border-b border-amber-600/30"></div>
                            <div className="border-b! border-amber-600/30"></div>
                            <div className="border-r! border-amber-600/30"></div>
                            <div></div>
                        </div>
                    </div>

                </div>

                {/* Balance */}
                <div className="mt-8!">
                    <p className="text-xs! uppercase tracking-wider text-(--chakra-colors-fg-muted)">
                        Available Balance
                    </p>

                    <h3 className="mt-1! text-3xl! font-bold!">
                        {formatCurrency(totalBalance)}
                    </h3>
                </div>

                {/* Card Number */}
                <div className="mt-6! flex items-center gap-4 font-mono text-sm! tracking-[0.2em]">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span>4821</span>
                </div>

                {/* Card Footer */}
                <div className="mt-6! flex items-end justify-between">
                    <div>
                        <p className="text-[9px]! uppercase tracking-widest text-(--chakra-colors-fg-muted)">
                            Card Holder
                        </p>

                        <p className="mt-1! text-sm! font-medium! uppercase">
                            { user?.name }
                        </p>
                    </div>

                    {/* <div>
                        <p className="text-[9px]! uppercase tracking-widest text-(--chakra-colors-fg-muted)">
                            Valid Thru
                        </p>

                        <p className="mt-1! text-sm! font-medium!">
                            12/29
                        </p>
                    </div> */}

                    {/* <div className="text-xl! font-black! italic!">
                        VISA
                    </div> */}

                    <div className="flex items-center">
                        <div className="h-9! w-9! rounded-full bg-red-500" />
                        <div className="-ml-3! h-9! w-9! rounded-full bg-yellow-400" />
                    </div>

                </div>
            </div>

            {/* Income / Expense */}
            <div className="mt-4! grid grid-cols-2 gap-4">
                <div className="rounded-2xl border! border-(--chakra-colors-border) bg-(--chakra-colors-bg-subtle) p-4!">
                    <div className="mb-3! flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
                        ↑
                    </div>

                    <p className="text-sm! text-(--chakra-colors-fg-muted)">
                        Total Income
                    </p>

                    <p className="mt-1! text-xl! font-bold!">
                        {formatCurrency(totalIncome)}
                    </p>
                </div>

                <div className="rounded-2xl border! border-(--chakra-colors-border) bg-(--chakra-colors-bg-subtle) p-4!">
                    <div className="mb-3! flex h-9 w-9 items-center justify-center rounded-full bg-red-400/10 text-red-400">
                        ↓
                    </div>

                    <p className="text-sm! text-(--chakra-colors-fg-muted)">
                        Total Expense
                    </p>

                    <p className="mt-1! text-xl! font-bold!">
                        {formatCurrency(totalExpense)}
                    </p>
                </div>
            </div>
        </div>
    );
}
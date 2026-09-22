import { LuArrowUpRight } from "react-icons/lu";


interface Props {
    totalBalance: number;
}

export default function BalanceCard({ totalBalance }: Props) {
    return (
        <section>
            <p className="text-sm! text-(--chakra-colors-fg-muted)">
                Total balance
            </p>

            <div className="mt-2!">
                <h1 className="text-3xl! font-semibold! tracking-tight! sm:text-4xl!">
                    ₱ {totalBalance.toLocaleString()}
                </h1>
            </div>

            <div className="mt-4! flex items-center gap-2 text-sm! ">
                <span className="flex items-center gap-1 text-emerald-400">
                <LuArrowUpRight size={16} />
                    ₱8,420
                </span>
                <span>this month</span>
            </div>
        </section>
    );
}
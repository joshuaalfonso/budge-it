import { LuArrowDownLeft, LuArrowUpRight } from "react-icons/lu";

export default function QuickActions() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:flex">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-transform active:scale-[0.98] dark:bg-white dark:text-zinc-900">
                <LuArrowDownLeft size={18} />
                Add expense
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm font-medium transition-colors hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                <LuArrowUpRight size={18} />
                Add income
            </button>
        </div>
    );
}
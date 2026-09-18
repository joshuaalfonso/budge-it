import { LuPlus } from "react-icons/lu";

import WalletCard from "../components/wallets/WalletCard";
import { wallets } from "@/data/wallet";

export default function Wallets() {
    const totalBalance = wallets.reduce(
        (total, wallet) => total + wallet.balance,
        0
    );

    return (
        <div>
            {/* Header */}
            <div className="mb-6! flex items-start justify-between gap-4">
                <div>
                    <h1 className=" text-2xl! font-semibold! tracking-tight!">
                        Wallets
                    </h1>
                    <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                        Your money across all accounts
                    </p>
                </div>

                <button
                    type="button"
                    className="flex h-9 items-center gap-2 rounded-md  px-3! text-sm! font-medium! text-white! bg-orange-400!"
                >
                    <LuPlus size={17} />
                    <span className="hidden sm:inline">
                        Add wallet
                    </span>
                </button>
            </div>

            {/* Total balance */}
            <section className="mb-6! rounded-md bg-(--chakra-colors-bg-subtle)! p-5!  sm:p-6!">
                <p className="text-sm! text-(--chakra-colors-fg-muted)">
                    Total balance
                </p>

                <p className="mt-2! text-3xl! font-semibold! tracking-tight! sm:text-4xl!">
                    ₱
                    {totalBalance.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })}
                </p>

                <p className="mt-2! text-sm! text-(--chakra-colors-fg-muted)">
                    Across {wallets.length} wallets
                </p>
            </section>

            {/* Wallets */}
            <section>
                <div className="mb-3! flex items-center justify-between">
                    <h2 className="text-base! font-semibold!">
                        Your wallets
                    </h2>

                    <p className="text-sm! text-(--chakra-colors-fg-muted)">
                        {wallets.length} accounts
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {wallets.map((wallet) => (
                        <WalletCard
                            key={wallet.id}
                            wallet={wallet}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
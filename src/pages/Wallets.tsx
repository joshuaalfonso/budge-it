import { LuPlus } from "react-icons/lu";

import WalletCard from "../components/wallets/WalletCard";
import { useWallet } from "@/queries/wallet.queries";
import { useWalletDialogStore } from "@/stores/wallet.store";
import WalletDialog from "@/components/wallets/WalletDialog";
import { Button } from "@chakra-ui/react";
import { colorPallette } from "@/constants";

export default function Wallets() {

    const { data: wallets, isPending, error } = useWallet();
    const setOpen = useWalletDialogStore((state) => state.setOpen);

    if (isPending) return <>Loading...</>;
    if (error) return <>Something went wrong</>;

    const totalBalance = wallets.reduce(
        (total, wallet) => total + +wallet.balance,
        0
    );

    return (
        <div>

            <WalletDialog />

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

                <Button 
                    size="sm" 
                    colorPalette={colorPallette}
                    onClick={() => setOpen(true)}
                    color="white"
                >
                    <LuPlus />
                    <span className="hidden sm:inline">
                        Add Wallet
                    </span>
                </Button>
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

                <div className="grid gap-3 sm:grid-cols-2">
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
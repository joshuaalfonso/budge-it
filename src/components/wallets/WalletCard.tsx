import type { Wallet } from "@/data/wallet";
import {
  LuBanknote,
  LuBuilding2,
  LuEllipsis,
  LuWallet as WalletIcon,
} from "react-icons/lu";


type WalletCardProps = {
  wallet: Wallet;
};

const walletIcons = {
  cash: LuBanknote,
  bank: LuBuilding2,
  ewallet: WalletIcon,
};

export default function WalletCard({ wallet }: WalletCardProps) {
    const Icon = walletIcons[wallet.type];

    return (
        <div className="rounded-md  bg-(--chakra-colors-bg-subtle) p-4!">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--chakra-colors-bg-emphasized)">
                        <Icon
                            size={19}
                            className="text-(--chakra-colors-fg-muted)"
                        />
                    </div>

                    <div>
                        <p className="text-sm! font-semibold!">
                            {wallet.name}
                        </p>

                        <p className="text-xs! capitalize text-(--chakra-colors-fg-muted)">
                            {wallet.type}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-(--chakra-colors-fg-muted) transition hover:bg-(--chakra-colors-bg-emphasized)"
                >
                    <LuEllipsis size={18} />
                </button>
            </div>

            <div className="mt-6!">
                <p className="text-xs! text-(--chakra-colors-fg-muted)">
                    Balance
                </p>

                <p className="mt-1! text-2xl! font-semibold! tracking-tight">
                    ₱{wallet.balance.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>

        </div>
    );
}
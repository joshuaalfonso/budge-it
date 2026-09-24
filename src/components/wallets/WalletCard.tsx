import { useDeleteWallet } from "@/queries/wallet.queries";
import { useCurrencyStore } from "@/stores/currency.store";
import { useWalletDialogStore } from "@/stores/wallet.store";
import type { Wallet } from "@/types/wallet.types";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuEllipsis } from "react-icons/lu";


type WalletCardProps = {
  wallet: Wallet;
};


export default function WalletCard({ wallet }: WalletCardProps) {

    const setSelected = useWalletDialogStore((state) => state.setSelected);

    const { mutate: deleteWallet, isPending: isDeleting } = useDeleteWallet();

    const formatCurrency = useCurrencyStore(
        (state) => state.formatCurrency
    );

    return (
        <div className="rounded-md  bg-(--chakra-colors-bg-subtle) p-4!">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--chakra-colors-bg-emphasized)">
                        <Icon
                            size={19}
                            className="text-(--chakra-colors-fg-muted)"
                        />
                    </div> */}

                    <div>
                        <p className="text-sm! font-semibold!">
                            {wallet.name}
                        </p>

                        <p className="text-xs! capitalize text-(--chakra-colors-fg-muted)">
                            {wallet.type}
                        </p>
                    </div>
                </div>

                {/* <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-(--chakra-colors-fg-muted) transition hover:bg-(--chakra-colors-bg-emphasized)"
                    onClick={() => setSelected(wallet)}
                >
                    <LuEllipsis size={18} />
                </button> */}

                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button variant="plain" size="sm" loading={isDeleting}>
                            <LuEllipsis />
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="edit" onClick={() => setSelected(wallet)}>Edit</Menu.Item>
                            <Menu.Item value="delete" onClick={() => deleteWallet(wallet.id)}>Delete</Menu.Item>
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

            </div>

            <div className="mt-6!">
                <p className="text-xs! text-(--chakra-colors-fg-muted)">
                    Balance
                </p>

                <p className="mt-1! text-2xl! font-semibold! tracking-tight">
                    {/* ₱{wallet.initialBalance.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })} */}
                    {/* ₱ {Math.abs(+wallet.balance).toLocaleString()} */}
                    {formatCurrency(+wallet.balance)}
                </p>
            </div>

        </div>
    );
}
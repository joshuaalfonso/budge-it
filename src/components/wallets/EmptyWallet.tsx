import { useMe } from "@/queries/auth.queries";
import { Button } from "@chakra-ui/react";
import { motion, type Variants } from "framer-motion";
import WalletDialog from "./WalletDialog";
import { useWalletDialogStore } from "@/stores/wallet.store";

const EmptyWallet = () => {

    const { data: user } = useMe();
    const setOpen = useWalletDialogStore((state) => state.setOpen)

    const containerVariants: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.3,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 14,
            filter: "blur(4px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <div className="h-dvh grid place-items-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full max-w-sm space-y-8! text-center"
            >
                <motion.div
                    variants={itemVariants}
                    className="space-y-3!"
                >
                    {/* <div className="flex items-center justify-center">
                        <img src={user?.picture} alt="Icon" className="rounded-full h-15 w-15" />
                    </div> */}
                    <h1 className="text-2xl! font-semibold! tracking-tight!">
                        Welcome {user?.name}! 👋
                    </h1>

                    <p className="text-(--chakra-colors-fg-muted) leading-relaxed!">
                        You don't have any wallets yet. Add your first wallet
                        to start tracking your money.
                    </p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center space-y-4! pt-2!"
                >
                    <motion.div
                        className="w-full"
                        whileHover={{
                            scale: 1.015,
                            transition: {
                                duration: 0.2,
                                ease: "easeOut",
                            },
                        }}
                        whileTap={{
                            scale: 0.98,
                            transition: {
                                duration: 0.12,
                            },
                        }}
                    >
                        <Button
                            colorPalette="orange"
                            size="lg"
                            width="full"
                            borderRadius="lg"
                            onClick={() => setOpen(true)}
                        >
                            Add your first wallet
                        </Button>
                    </motion.div>

                    <p className="text-sm text-gray-400">
                        You can add more wallets later.
                    </p>
                </motion.div>
            </motion.div>

            <WalletDialog />

        </div>
    );
};

export default EmptyWallet;

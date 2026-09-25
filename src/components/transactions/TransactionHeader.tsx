import { LuLoader, LuPlus } from "react-icons/lu";
import { Button } from "@chakra-ui/react";
import { colorPallette } from "@/constants";

interface TransactionHeaderProps {
    isFetching: boolean;
    onOpenDialog: () => void;
}

export default function TransactionHeader({ isFetching, onOpenDialog }: TransactionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6!">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                        Transactions
                    </h1>
                    {isFetching && (
                        <LuLoader className="animate-spin text-(--chakra-colors-fg-muted)" size={18} />
                    )}
                </div>
                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted) max-w-xs">
                    Keep track of where your money goes
                </p>
            </div>
            <Button 
                size="sm" 
                // color="white" 
                variant="solid"
                colorPalette={colorPallette} 
                onClick={onOpenDialog}
            >
                <LuPlus />
                <span className="hidden md:block">Add Transaction</span>
            </Button>
        </div>
    );
}
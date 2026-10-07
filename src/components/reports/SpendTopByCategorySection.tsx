import type {
    SpendingByCategory,
} from "@/types/analytics.types";
import { ScrollArea } from "@chakra-ui/react";
import SpendByCategoryChart from "./SpendByCategoryChart";

interface SpendingTrendSectionProps {
    spendingByCategory: SpendingByCategory[];
    // totalExpense: number;
    // period: ReportPeriod;
}

export default function SpendingByCategorySection({
    spendingByCategory
}: SpendingTrendSectionProps) {

    return (
        <section className="rounded-md border p-4! bg-(--chakra-colors-bg-subtle) sm:p-5!">
            <div className="mb-8!">
                <h2 className="text-base! font-semibold!">
                    Spending by category
                </h2>

                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    Where your money went this month
                </p>
            </div>

                <ScrollArea.Root height="64" size="xs" >
                    <ScrollArea.Viewport>
                    <ScrollArea.Content   paddingEnd="5" className="h-full">
                        <SpendByCategoryChart 
                            spendingByCategory={spendingByCategory} 
                        />
                    </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar>
                    <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                </ScrollArea.Root>
                
        </section>
    );
}

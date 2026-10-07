import type { ReportTab } from "@/types/analytics.types";
import type { DateValue } from "@chakra-ui/react";
import { LuLoader } from "react-icons/lu";
import ReportPeriodSelector from "./ReportPeriodSelector";


interface ReportHeaderProps {
    tabValue: ReportTab;
    selectedDate: DateValue[];
    isFetching: boolean;
    onTabChange: (value: ReportTab) => void;
    onDateChange: (value: DateValue[]) => void;
}

export default function ReportHeader({
    tabValue,
    selectedDate,
    isFetching,
    onTabChange,
    onDateChange,
}: ReportHeaderProps) {
    return (
        <div className="mb-6! flex flex-col gap-4">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl! font-semibold! tracking-tight! sm:text-2xl!">
                        Reports
                    </h1>

                    {isFetching && (
                        <LuLoader
                            className="animate-spin text-(--chakra-colors-fg-muted)"
                            size={18}
                        />
                    )}
                </div>

                <p className="mt-1! text-sm! text-(--chakra-colors-fg-muted)">
                    Understand your spending habits
                </p>
            </div>

            <ReportPeriodSelector
                tabValue={tabValue}
                selectedDate={selectedDate}
                onTabChange={onTabChange}
                onDateChange={onDateChange}
            />
        </div>
    );
}

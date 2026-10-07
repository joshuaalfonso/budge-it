import {
    LuArrowDownRight,
    LuArrowUpRight,
} from "react-icons/lu";

import { useCurrencyStore } from "@/stores/currency.store";

type TrendType =
    | "income"
    | "expense"
    | "neutral";

interface ReportSummaryCardProps {
    label: string;
    value: number;
    percentage?: number | null;
    trend?: TrendType;
    percentageLabel?: string;
    footer?: string;
    valueType?: "currency" | "number";
}

export default function ReportSummaryCard({
    label,
    value,
    percentage,
    trend = "neutral",
    percentageLabel,
    footer,
    valueType = "currency",
}: ReportSummaryCardProps) {
    const formatCurrency = useCurrencyStore(
        (state) => state.formatCurrency
    );

    const formattedValue =
        valueType === "number"
            ? Math.abs(value).toLocaleString()
            : formatCurrency(value);

    const getTrendColor = () => {
        if (trend === "income") {
            return percentage != null && percentage >= 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400";
        }

        if (trend === "expense") {
            return percentage != null && percentage >= 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400";
        }

        return "text-(--chakra-colors-fg-muted)";
    };

    return (
        <div className="rounded-md bg-(--chakra-colors-bg-subtle) p-4!">
            <p className="text-sm! text-(--chakra-colors-fg-muted)">
                {label}
            </p>

            <p className="mt-2! text-xl! font-semibold!">
                {formattedValue}
            </p>

            {percentage != null && trend !== "neutral" && (
                <div
                    className={`mt-2! flex items-center gap-1 text-xs! ${getTrendColor()}`}
                >
                    {percentage >= 0 ? (
                        <LuArrowUpRight size={14} />
                    ) : (
                        <LuArrowDownRight size={14} />
                    )}

                    {Math.abs(percentage).toFixed(1)}%
                </div>
            )}

            {percentage != null && trend === "neutral" && (
                <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                    {percentage.toFixed(1)}%
                    {percentageLabel && ` ${percentageLabel}`}
                </p>
            )}

            {footer && (
                <p className="mt-2! flex items-center gap-1 text-xs! text-(--chakra-colors-fg-muted)">
                    {footer}
                </p>
            )}
        </div>
    );
}

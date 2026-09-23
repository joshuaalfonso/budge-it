import { LuSearch, LuSlidersHorizontal, LuCalendar } from "react-icons/lu";
import { DatePicker, Portal } from "@chakra-ui/react";

interface TransactionControlsProps {
    search: string;
    setSearch: (value: string) => void;
    currentType?: string;
    onTypeChange: (value: string | undefined) => void;
    onDateChange: (details: { value: any[] }) => void;
}

export default function TransactionControls({
    search,
    setSearch,
    currentType,
    onTypeChange,
    onDateChange,
}: TransactionControlsProps) {
    return (
        <div className="space-y-5!">
        {/* Search Bar */}
        <div className="flex gap-2">
            <div className="relative flex-1">
            <LuSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--chakra-colors-fg-muted)"
            />
            <input
                type="text"
                placeholder="Search transactions..."
                className="h-11 w-full rounded-xl bg-(--chakra-colors-bg-subtle)! pl-10! pr-4! text-sm! outline-none transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl! transition sm:w-auto sm:px-4! bg-(--chakra-colors-bg-subtle)!"
            >
            <LuSlidersHorizontal size={18} />
            <span className="ml-2! hidden text-sm! font-medium! sm:inline">Filters</span>
            </button>
        </div>

        {/* Date Picker */}
        <div>
            <DatePicker.Root
            selectionMode="range"
            maxWidth="20rem"
            onValueChange={onDateChange}
            >
            <DatePicker.Control>
                <DatePicker.Input index={0} borderRadius="xl" border="none" bg="bg.subtle" />
                <DatePicker.Input index={1} borderRadius="xl" border="none" bg="bg.subtle" />
                <DatePicker.IndicatorGroup>
                <DatePicker.Context>
                    {(context) =>
                    context.value.length ? (
                        <DatePicker.ClearTrigger />
                    ) : (
                        <DatePicker.Trigger>
                        <LuCalendar />
                        </DatePicker.Trigger>
                    )
                    }
                </DatePicker.Context>
                </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
                <DatePicker.Positioner>
                <DatePicker.Content>
                    <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                    </DatePicker.View>
                    <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                    </DatePicker.View>
                    <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                    </DatePicker.View>
                </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
            </DatePicker.Root>
        </div>

        {/* Type Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1!">
            {[
            { label: "All", value: undefined },
            { label: "Income", value: "income" },
            { label: "Expenses", value: "expense" },
            ].map((item) => {
            const active = currentType === item.value;

            return (
                <button
                key={item.label}
                type="button"
                onClick={() => onTypeChange(item.value)}
                className={`shrink-0 rounded-xl px-4! py-2! text-sm! font-medium! transition text-(--chakra-colors-fg-muted)! ${
                    active ? "bg-orange-400/10! text-orange-400!" : "bg-(--chakra-colors-bg-subtle)!"
                }`}
                >
                {item.label}
                </button>
            );
            })}
        </div>
        </div>
    );
}
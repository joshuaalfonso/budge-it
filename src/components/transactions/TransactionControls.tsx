import { LuSearch, LuSlidersHorizontal, LuCalendar } from "react-icons/lu";
import { Button, DatePicker, Popover, Portal } from "@chakra-ui/react";
import type { Category } from "@/types/category.type";
import { colorPallette } from "@/constants";

interface TransactionControlsProps {
    search: string;
    setSearch: (value: string) => void;
    currentType?: string;
    currentCategory?: string;
    onTypeChange: (value: string | undefined) => void;
    onCategoryChange: (value: string | undefined) => void;
    onDateChange: (details: { value: {day: number, era: string, month: number, year: number}[] }) => void;
    categories: Category[]; 
}

export default function TransactionControls({
    search,
    setSearch,
    currentType,
    currentCategory,
    onTypeChange,
    onCategoryChange,
    onDateChange,
    categories
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

                {/* <button
                    type="button"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl! transition sm:w-auto sm:px-4! bg-(--chakra-colors-bg-subtle)!"
                >
                    <LuSlidersHorizontal size={18} />
                    <span className="ml-2! hidden text-sm! font-medium! sm:inline">Filters</span>
                </button> */}

                <Popover.Root positioning={{ placement: "bottom-end"}} autoFocus={false}>
                    <Popover.Trigger asChild>
                        <Button size="lg" bg="bg.subtle" color="fg" borderRadius="xl">
                            <LuSlidersHorizontal  />
                            <span className="ml-2! hidden text-sm! font-medium! sm:inline">Filters</span>
                        </Button>
                    </Popover.Trigger>
                    <Portal>
                        <Popover.Positioner>
                            <Popover.Content bg={'bg.panel'}>
                                {/* <Popover.Arrow /> */}
                                <Popover.Body>
                                    {/* <Popover.Title fontWeight="medium" mb="6">Filters</Popover.Title> */}

                                    <div className="flex flex-col gap-6">
                                        {/* date range */}
                                        <div>
                                            <h1 className="text-xs! font-medium! mb-2! text-(--chakra-colors-fg-muted) uppercase">Date range</h1>
                                            <DatePicker.Root
                                                selectionMode="range"
                                                maxWidth=""
                                                onValueChange={onDateChange}
                                                variant={'subtle'}
                                                size="sm"
                                                colorPalette={colorPallette} 
                                                css={{
                                                    // Targets the day cell trigger when selected or in range
                                                    "& [data-part='table-cell-trigger'][data-selected]": {
                                                    bg: "blue.400 !important",
                                                    color: "white !important",
                                                    },
                                                    // Target highlighted range cells (between start and end dates)
                                                    "& [data-part='table-cell-trigger'][data-in-range]": {
                                                    bg: "blue.100 !important",
                                                    color: "blue.800 !important",
                                                    },
                                                }}
                                            >
                                                <DatePicker.Control>
                                                    <DatePicker.Input index={0} borderRadius="xl" border="none"  />
                                                    <DatePicker.Input index={1} borderRadius="xl" border="none"  />
                                                    <DatePicker.IndicatorGroup>
                                                    <DatePicker.Context >
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
                                        <div>
                                            <h1 className="text-xs! font-medium! mb-2! text-(--chakra-colors-fg-muted) uppercase">Type</h1>
                                            <div className="flex gap-2 overflow-x-auto pb-1!">
                                                {[
                                                    { label: "All", value: undefined },
                                                    { label: "Income", value: "income" },
                                                    { label: "Expenses", value: "expense" },
                                                ].map((item) => {
                                                    const active = currentType === item.value;

                                                    return (
                                                        <Button
                                                            key={item.label}
                                                            type="button"
                                                            rounded="xl"
                                                            size="sm"
                                                            variant={active ? 'solid': 'subtle'}
                                                            onClick={() => onTypeChange(item.value)}
                                                            colorPalette={active ? colorPallette : ''}
                                                        >
                                                            {item.label}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* category filter */}
                                        <div>
                                            <h1 className="text-xs! font-medium! mb-2! text-(--chakra-colors-fg-muted) uppercase">Category</h1>
                                            <div className="flex gap-2 flex-wrap pb-1!">
                                                {categories.map((item) => {
                                                    const active = currentCategory == String(item.id); 

                                                    return (
                                                        // <button
                                                        //     key={item.id}
                                                        //     type="button"
                                                        //     onClick={() => {
                                                        //         onCategoryChange(active ? undefined : String(item.id));
                                                        //     }}
                                                        //     className={`shrink-0 rounded-xl px-4! py-2! text-sm! font-medium! transition text-(--chakra-colors-fg-muted)! ${
                                                        //         active ? "bg-orange-400/10! text-orange-400!" : "bg-(--chakra-colors-bg-subtle)!"
                                                        //     }`}
                                                        // >
                                                        //     {item.name}
                                                        // </button>
                                                        <Button
                                                            key={item.id}
                                                            type="button"
                                                            rounded="xl"
                                                            size="sm"
                                                            variant={active ? 'solid': 'subtle'}
                                                            onClick={() => {
                                                                onCategoryChange(active ? undefined : String(item.id));
                                                            }}
                                                            colorPalette={active ? colorPallette : ''}
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                            
                                </Popover.Body>
                            </Popover.Content>
                        </Popover.Positioner>
                    </Portal>
                </Popover.Root>


            </div>

            {/* Date Picker */}
            

        </div>
    );
}
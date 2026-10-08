import {
    DatePicker,
    parseDate,
    Portal,
    Tabs,
    type DateValue,
} from "@chakra-ui/react";
// import { CalendarDate, parseDate } from "@internationalized/date";
import { LuCalendar } from "react-icons/lu";

import { colorPallette } from "@/constants";
import type { ReportTab } from "@/types/analytics.types";

interface ReportPeriodSelectorProps {
    tabValue: ReportTab;
    selectedDate: DateValue[];
    onTabChange: (value: ReportTab) => void;
    onDateChange: (value: DateValue[]) => void;
}

export default function ReportPeriodSelector({
    tabValue,
    selectedDate,
    onTabChange,
    onDateChange,
}: ReportPeriodSelectorProps) {
    return (
        <div className="flex justify-end gap-4">
            <Tabs.Root
                variant="subtle"
                value={tabValue}
                onValueChange={(event) => {
                    onTabChange(event.value as ReportTab);
                }}
                colorPalette={colorPallette}
            >
                <Tabs.List>
                    <Tabs.Trigger value="month">
                        Month
                    </Tabs.Trigger>

                    <Tabs.Trigger value="year">
                        Year
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>

            {tabValue === "month" && (
                <MonthPicker
                    value={selectedDate}
                    onChange={onDateChange}
                />
            )}

            {tabValue === "year" && (
                <YearPicker
                    value={selectedDate}
                    onChange={onDateChange}
                />
            )}
        </div>
    );
}

interface PickerProps {
    value: DateValue[];
    onChange: (value: DateValue[]) => void;
}

const today = new Date();

const maxDate = parseDate(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`
);

function MonthPicker({ value, onChange }: PickerProps) {
    const format = (date: DateValue) => {
        const month = date.month.toString().padStart(2, "0");
        const year = date.year.toString();

        return `${month}/${year}`;
    };

    const parse = (value: string): DateValue | undefined => {
        const regex = /^(\d{1,2})\/(\d{4})$/;
        const match = value.match(regex);

        if (!match) {
            return undefined;
        }

        const month = Number(match[1]);
        const year = Number(match[2]);

        if (month < 1 || month > 12) {
            return undefined;
        }

        return parseDate(
            `${year}-${String(month).padStart(2, "0")}-01`,
        );
    };

    return (
        <DatePicker.Root
            format={format}
            parse={parse}
            value={value}
            onValueChange={(details) => {
                onChange(details.value);
            }}
            defaultView="month"
            minView="month"
            placeholder="mm/yyyy"
            maxWidth="10rem"
            bg="bg.subtle"
            max={maxDate}
        >
            <DatePicker.Control>
                <DatePicker.Input colorPalette={colorPallette} />

                <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                        <LuCalendar />
                    </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
            </DatePicker.Control>

            <Portal>
                <DatePicker.Positioner>
                    <DatePicker.Content>
                        <DatePicker.View view="month">
                            <DatePicker.Header />

                            <DatePicker.MonthTable
                                colorPalette={colorPallette}
                            />
                        </DatePicker.View>

                        <DatePicker.View view="year">
                            <DatePicker.Header />

                            <DatePicker.YearTable
                                colorPalette={colorPallette}
                            />
                        </DatePicker.View>
                    </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
        </DatePicker.Root>
    );
}

function YearPicker({ value, onChange }: PickerProps) {
    const format = (date: DateValue) => {
        return date.year.toString();
    };

    const parse = (value: string | undefined) => {
        if (!value) {
            return undefined;
        }

        const year = Number(value);

        if (Number.isNaN(year)) {
            return undefined;
        }

        if (year < 100) {
            const currentYear = new Date().getFullYear();
            const currentCentury = Math.floor(currentYear / 100) * 100;
            const fullYear = currentCentury + year;

            return parseDate(`${fullYear}-01-01`);
        }

        return parseDate(`${year}-01-01`);
    };

    return (
        <DatePicker.Root
            format={format}
            parse={parse}
            value={value}
            onValueChange={(details) => {
                onChange(details.value);
            }}
            defaultView="year"
            minView="year"
            placeholder="yyyy"
            maxWidth="10rem"
            bg="bg.subtle"
               max={maxDate}
        >
            <DatePicker.Control>
                <DatePicker.Input />

                <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                        <LuCalendar />
                    </DatePicker.Trigger>
                </DatePicker.IndicatorGroup>
            </DatePicker.Control>

            <Portal>
                <DatePicker.Positioner>
                    <DatePicker.Content>
                        <DatePicker.View view="year">
                            <DatePicker.Header />

                            <DatePicker.YearTable colorPalette={colorPallette} />
                        </DatePicker.View>
                    </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
        </DatePicker.Root>
    );
}

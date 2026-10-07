import type { ReportPeriod } from "@/types/analytics.types";
import { parseDate } from "@chakra-ui/react";
import type { DateValue } from "@chakra-ui/react";
import { useState } from "react";


export function useReportPeriod() {
    const [tabValue, setTabValue] = useState<'month' | 'year'>("month");

    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState<DateValue[]>([
        parseDate(currentDate),
    ]);

    const date = selectedDate[0];

    const period: ReportPeriod =
        tabValue === "month"
            ? {
                  type: "month",
                  month: date.month,
                  year: date.year,
              }
            : {
                  type: "year",
                  year: date.year,
              };

    return {
        tabValue,
        selectedDate,
        period,
        setTabValue,
        setSelectedDate,
    };
}

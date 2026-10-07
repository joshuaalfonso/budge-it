import { colorPallette } from "@/constants"
import type { DailySpending } from "@/types/analytics.types"
import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface Props {
  dailySpending: DailySpending[],
  totalExpense: number
}

const SpendTrendChart = ({ dailySpending, totalExpense }: Props) => {


    const formattedData = dailySpending.map((item) => ({
        ...item,
        day: Number(item.date.split("-")[2]),
    }))

    const chart = useChart({
        data: formattedData,
        series: [
            {
                name: "totalExpense",
                label: "Total Expense",
                color: `${colorPallette}.emphasized`,
            },
        ],
    })

    if (!totalExpense) return (
        <div className="h-full! grid place-items-center">
            <span className="text-(--chakra-colors-fg-muted)">Nothing to display</span>
        </div>
    )

    return (
        <Chart.Root maxH="xs" chart={chart}>
        <BarChart data={chart.data} responsive>
            <CartesianGrid
                stroke={chart.color("border.muted")}
                vertical={false}
            />

            <XAxis
                axisLine={false}
                tickLine={false}
                dataKey={chart.key("day")}
                interval={2}
            />

            <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={chart.formatNumber({
                    style: "decimal",
                    // currency: "PHP",
                    notation: "compact",
                })}
            />

            <Tooltip
            cursor={{ fill: chart.color("bg.muted") }}
            animationDuration={100}
            content={<Chart.Tooltip />}
            />

            {chart.series.map((item) => (
            <Bar
                key={item.name}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
                isAnimationActive
            />
            ))}
        </BarChart>
        </Chart.Root>
    )
}

export default SpendTrendChart

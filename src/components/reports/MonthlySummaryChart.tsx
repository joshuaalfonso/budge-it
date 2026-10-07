


import type { MonthlySummary } from "@/types/analytics.types"
import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
} from "recharts"


interface Props {
  monthlySummary: MonthlySummary[]
}


export const MonthlySummaryChart = ({monthlySummary}: Props) => {
    const chart = useChart({
        data: monthlySummary,
        series: [
            { name: "totalIncome", label: "Total Income", color: "blue.emphasized" },
            { name: "totalExpense", label: "Total Expense", color: "red.emphasized" },
            // { name: "savings", label: "Savings", color: "blue.emphasized" },
        ],
    })

    return (
        <Chart.Root maxH="md" chart={chart}>
            <BarChart data={chart.data} responsive>
                <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey={chart.key("month")}
                    tickFormatter={(value) => {
                        return value
                    }}
                />
                <Tooltip
                    cursor={{ fill: chart.color("bg.muted") }}
                    animationDuration={100}
                    content={<Chart.Tooltip />}
                />
                <Legend content={<Chart.Legend />} />
                {chart.series.map((item) => (
                    <Bar
                        isAnimationActive={false}
                        key={item.name}
                        dataKey={chart.key(item.name)}
                        fill={chart.color(item.color)}
                        stroke={chart.color(item.color)}
                        stackId={item.stackId}
                    />
                ))}
            </BarChart>
        </Chart.Root>
    )
}

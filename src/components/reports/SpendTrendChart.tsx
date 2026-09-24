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
  dailySpending: DailySpending[]
}

const SpendTrendChart = ({ dailySpending }: Props) => {


    const formattedData = dailySpending.map((item) => ({
        ...item,
        day: Number(item.date.split("-")[2]),
    }))

    const chart = useChart({
        data: formattedData,
        series: [
        {
            name: "totalExpense",
            color: `${colorPallette}.emphasized`,
        },
        ],
    })

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
            />

            <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
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

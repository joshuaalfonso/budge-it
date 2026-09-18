import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

const SpendTrendChart = () => {
    const chart = useChart({
        data: [
        { income: 60, month: "Jan" },
        { income: 45, month: "Feb" },
        { income: 12, month: "Mar" },
        { income: 80, month: "Apr" },
        { income: 100, month: "May" },
        { income: 30, month: "Nov" },
        { income: 70, month: "Dec" },
        ],
        series: [{ name: "income", color: "orange.solid" }],
    })
    return (
        <Chart.Root maxH="xs" chart={chart}>
            <BarChart data={chart.data} responsive>
                <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
                <XAxis axisLine={false} tickLine={false} dataKey={chart.key("month")} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(income) => `${income}%`}
                />
                {chart.series.map((item) => (
                    <Bar
                        key={item.name}
                        isAnimationActive={false}
                        dataKey={chart.key(item.name)}
                        fill={chart.color(item.color)}
                        radius={[8, 8, 8, 8]}
                        barSize={40}
                    />
                ))}
            </BarChart>
        </Chart.Root>
    )

}

  

export default SpendTrendChart
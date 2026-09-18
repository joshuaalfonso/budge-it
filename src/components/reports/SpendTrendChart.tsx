import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"


const SpendTrendChart = () => {
    const chart = useChart({
        data: [
        { value: 60, month: "Jan" },
        { value: 45, month: "Feb" },
        { value: 12, month: "Mar" },
        { value: 80, month: "Apr" },
        { value: 100, month: "May" },
        { value: 30, month: "Nov" },
        { value: 70, month: "Dec" },
        ],
        series: [{ name: "value", color: "orange.solid" }],
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
                    tickFormatter={(value) => `${value}%`}
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